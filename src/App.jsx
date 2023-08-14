import { useState, useRef } from 'react'
import { Editor } from '@monaco-editor/react';
import { Grid, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import examples from './examples';

import './App.css'

function App() {
  const editorRef = useRef(null)
  const [ currentText, setCurrentText ] = useState(examples["monaco-example"]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor
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
    "wordWrap": "on",
  }

  return (
      // TODO: Add toolbar at the top?
      <Grid container direction="row">
        {/* where the actual editor goes */}
        <Grid item md={6}>
          <div className="App">
            <Editor 
              height="100vh"
              width="100%"
              theme="vs-dark"
              defaultValue={examples["monaco-example"]}
              defaultLanguage="markdown"
              onMount={handleEditorDidMount}
              onChange={() => {
                setCurrentText(editorRef.current.getValue())
              }}
              options={options}
            />
          </div>
        </Grid>
        
        {/* where the previewer goes */}
        <Grid item md={6}>
        <div style={{ height: '100vh', overflow: 'auto' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentText}</ReactMarkdown>
          </div>
        </Grid>
      </Grid>
  )
}

export default App
