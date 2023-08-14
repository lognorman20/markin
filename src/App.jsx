import { useState, useRef } from 'react'
import { Editor } from '@monaco-editor/react';
import { Grid, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import examples from './examples';

import './App.css'

function App() {
  const editorRef = useRef(null);
  const modelRef = useRef(null);
  const [ currentText, setCurrentText ] = useState(examples["monaco-example"]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    modelRef.current = editor.getModel();
    
    editorRef.current.onDidChangeModelContent((event) => {
      if (!modelRef.current) return;
    
      const fullText = modelRef.current.getValue();
      const lines = fullText.split('\n');
    
      const newTextLines = lines.map((line) => {
        if (line.length <= maxWidth) {
          return line;
        }
    
        let currentLine = '';
        let wrappedLines = [];
        const words = line.split(' ');
    
        for (const word of words) {
          if (currentLine && (currentLine + ' ' + word).length <= maxWidth) {
            currentLine += ' ' + word;
          } else {
            wrappedLines.push(currentLine);
            currentLine = word;
          }
        }
    
        if (currentLine) {
          wrappedLines.push(currentLine);
        }
        
        return wrappedLines.join('\n');
      });
    
      const newText = newTextLines.join('\n');
      if (newText !== fullText) {
        const cursorPosition = editorRef.current.getPosition();
        modelRef.current.setValue(newText);
        editorRef.current.setPosition(cursorPosition);
      }
    });

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
