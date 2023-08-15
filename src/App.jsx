import { useState, useRef } from 'react'
import { Editor } from '@monaco-editor/react';
import { Grid } from '@mui/material';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import examples from './examples';
import SaveButton from './components/SaveButton';

import './App.css'

function App() {
  const editorRef = useRef(null);
  const modelRef = useRef(null);
  const [currentText, setCurrentText] = useState(examples["cheese"]);
  const [filename, setFilename] = useState(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    modelRef.current = editor.getModel();

    // setup monaco-vim
    window.require.config({
      paths: {
        "monaco-vim": "https://unpkg.com/monaco-vim/dist/monaco-vim"
      }
    });

    window.require(["monaco-vim"], function (MonacoVim) {
      const statusNode = document.querySelector(".status-node");
      MonacoVim.initVimMode(editor, statusNode);
    });
  }

  const options = {
    "renderWhitespace": "all",
    "autoIndent": true,
    "fontSize": 16,
    "scrollBeyondLastLine": false,
    "wordWrap": "on",
    "minimap": {
      "enabled": true,
      "autohide": true
    }
  }

  return (
    <>
      <SaveButton currentText={currentText} defaultFileName={filename} />
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
                      // useInlineStyles={false}
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
