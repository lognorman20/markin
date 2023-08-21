import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SaveButton({ defaultFileName, currentText }) {
    const [filename, setFilename] = useState(defaultFileName);
    const [errorOpen, setErrorOpen] = React.useState(false);

    useEffect(() => {
        setFilename(defaultFileName);
    }, [defaultFileName]);

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setErrorOpen(false);
    };

    function download() {
        if (!filename) {
            setErrorOpen(true);
            return;
        }

        const blob = new Blob([currentText], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;

        document.body.appendChild(link);

        // Use a timeout to ensure the link is added to the DOM before clicking it
        setTimeout(() => {
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            alert(`successfully downloaded ${filename}.md to your computer!`);
        }, 0);
    }

    return (
        <>
            <IconButton
                onClick={download}
                sx={{
                    color: 'primary.dark',
                    padding: 0,
                    paddingRight: 1,
                }}
            >
                <SaveIcon />
            </IconButton>
            <Snackbar 
                open={errorOpen}
                autoHideDuration={5000}
                onClose={handleErrorClose}
                action={
                <React.Fragment>
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    sx={{ p: 0.5 }}
                    onClick={handleErrorClose}
                    >
                    <CloseIcon />
                    </IconButton>
                </React.Fragment>
                }
            >
                <Alert onClose={handleErrorClose} autoHideDuration={5000} severity="error" sx={{ width: '100%' }}>
                    Failed to save: u need to give me a good filename bro
                </Alert>
            </Snackbar>
        </>
    )
}

export default SaveButton;