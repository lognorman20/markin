import { useState, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { VimMode } from 'monaco-vim';
import { Button, Grid } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import showdown from 'showdown';
import examples from './examples';
import SaveButton from './components/SaveButton';
import MarkdownIt from 'markdown-it';

import './App.css'

function App() {
  const editorRef = useRef(null);
  const modelRef = useRef(null);
  const md = new MarkdownIt();
  const [currentText, setCurrentText] = useState(examples["cheese"]);
  const [filename, setFilename] = useState(null);

  function clearText() {
    alert('spotemgotem');
  }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    modelRef.current = editor.getModel();

    // setup monaco-vim
    window.require.config({
      paths: {
        'vs': 'https://unpkg.com/monaco-editor/min/vs',
        'monaco-vim': 'https://unpkg.com/monaco-vim/dist/monaco-vim',
      }
    });

    window.require(["monaco-vim"], function (MonacoVim) {
      const statusNode = document.createElement('div');
      statusNode.style.display = 'flex';
      statusNode.style.position = 'fixed';
      statusNode.style.zIndex = '3';
      statusNode.style.bottom = '0';
      statusNode.style.left = '0';
      statusNode.style.color = 'white';
      statusNode.style.background = '#2d2d30';
      statusNode.style.width = '100%';
      statusNode.style.fontSize = '13px';
      statusNode.style.fontWeight = '500';

      statusNode.addEventListener('change', function() {
        VimMode.Vim.defineEx('write', 'w', clearText);
      });

      MonacoVim.initVimMode(editorRef.current, statusNode);

      document.body.appendChild(statusNode);
    });
  }

  const options = {
    "renderWhitespace": "all",
    "autoIndent": true,
    "fontSize": 16,
    "wordWrap": "on",
    "minimap": {
      "enabled": true,
      "autohide": true
    },
  }

  async function deployWebsite(htmlContent, filename) {
    const data = {
      html: htmlContent,
      filename: filename
    };

    console.log('trying to deploy website..');
  
    try {
      const response = await fetch('https://fir-server-123.web.app/create-html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        console.log(response);
        console.log('Website creation successful.');
        alert(`Check out your new website at markin-${filename}.web.app`);
      } else {
        console.error('Website creation failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  function mdToHtml() {
    const html = md.render(currentText);
    console.log(html);
    return html;
  }

  function handleDeployClick() {
    const htmlContent = mdToHtml();
    const filename = "testingfr";

    deployWebsite(htmlContent, filename);
  }

  return (
    <>
      {/* top bar */}
      <Grid container spacing={2} direction="row-reverse">
        <Grid item>
          <SaveButton currentText={currentText} defaultFileName={filename} />
        </Grid>
        <Grid item>
          <Button onClick={mdToHtml}>deploy</Button>
        </Grid>
      </Grid>

      {/* editor */}
      <Grid container spacing={2} direction="row">
        <Grid item md={6}>
          <div className="App">
            <Editor
              height="100vh"
              width="100%"
              theme="vs-dark"
              defaultValue={examples["cheese"]}
              defaultLanguage="markdown"
              onMount={handleEditorDidMount}
              onChange={() => {
                setCurrentText(editorRef.current.getValue())
              }}
              options={options}
            />
          </div>
        </Grid>

        {/* preview */}
        <Grid item md={6}>
          <div style={{ height: '100vh', overflow: 'auto' }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              children={currentText}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      children={String(children).replace(/\n$/, '')}
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                    />
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  )
                }
              }}
            />
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default App
