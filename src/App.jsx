import { useState, useRef } from 'react'
import { Editor } from '@monaco-editor/react';
import { Grid, Typography } from '@mui/material';
import examples from './examples';

import './App.css'

function App() {
  const editorRef = useRef(null)

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor
    // setup key bindings
    editor.addAction({
      // an unique identifier of the contributed action
      id: "some-unique-id",
      // a label of the action that will be presented to the user
      label: "Some label!",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],

      // the method that will be executed when the action is triggered.
      run: function (editor) {
        alert("we wanna save something => " + editor.getValue());
        return null;
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

  function getEditorValue() {
    alert(editorRef.current.getValue())
  }

  const options = {
    "renderWhitespace": "all",
    "autoIndent": true,
    "fontSize": 16,
    "wordWrap": "on"
  }

  return (
      <Grid container direction="row">
        <Grid item md={6}>
          <div className="App">
            <Editor 
              height="100vh"
              width="100%"
              theme="vs-dark"
              defaultValue={examples["monaco-example"]}
              defaultLanguage="markdown"
              onMount={handleEditorDidMount}
              options={options}
            />
          </div>
        </Grid>
        <Grid item>
          <Typography variant='h1'>WADDUP</Typography>
        </Grid>
      </Grid>

  )
}

export default App
