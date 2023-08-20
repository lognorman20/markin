import React, { useState, useRef } from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: '#1a1a1a',
      fontWeight: 'bold',
      border: '1px solid',
      borderColor: "#616161",
      fontSize: 14,
      paddingRight: '0.5rem', 
      width: '10rem',
      textAlign: 'right', 
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      color: 'white',
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
}));

function FilenameInput({ onInputSubmit, defaultFilename }) {
    const inputRef = useRef(null);
    const [name, setName] = useState(defaultFilename);

    const handleInputChange = (event) => {
        const newName = event.target.value;
        setName(newName);  // Update the local state
        onInputSubmit(newName);  // Notify the parent component
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            inputRef.current.blur();
            onInputSubmit(name);  // Notify the parent component
        }
    };
    
    const handleBlur = () => {
        onInputSubmit(name);  // Notify the parent component
    };

    return (
        <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input" />
            <BootstrapInput
                value={name}
                id="bootstrap-input"
                inputRef={inputRef}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
            />
        </FormControl>
    );
}

export default FilenameInput;
