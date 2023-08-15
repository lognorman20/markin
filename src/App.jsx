import { useState, useRef } from 'react'
import { Editor } from '@monaco-editor/react';
import { Grid } from '@mui/material';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import examples from './examples';

import './App.css'

function App() {
  const editorRef = useRef(null);
  const modelRef = useRef(null);
  const [ currentText, setCurrentText ] = useState(examples["cheese"]);

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
      // TODO: Add toolbar at the top?
      <Grid container spacing={2} direction="row">
        {/* where the actual editor goes */}
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
                // 58 characters is the max
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
