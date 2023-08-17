import React, { useState } from 'react';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MarkdownIt from 'markdown-it';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DeployButton({ currentText, defaultFilename }) {
    const md = new MarkdownIt();
    const [deployOpen, setDeployOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [filename, setFilename] = useState(defaultFilename);

    const handleDeployClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setDeployOpen(false);
    };

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setSuccessOpen(false);
    };

    async function deployWebsite(htmlContent, name) {
        const data = {
            html: htmlContent,
            filename: name
        };

        console.log('trying to deploy website..');
        console.log(`filename: ${name}`);

        try {
            const response = await fetch('https://fir-server-123.web.app/create-html', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const json = response.json();
                console.log(json);
                console.log(htmlContent);

                console.log('Website creation successful.');
                setSuccessOpen(true);
            } else {
                console.error('Website creation failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    function mdToHtml() {
        const html = md.render(currentText);
        return html;
    }

    function kebabCase(inputString) {
        if (!inputString) {
            inputString = 'your-file';
        }

        const letters = 'abcdefghijklmnopqrstuvwxyz';
        let randomLetters = '';
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            randomLetters += letters.charAt(randomIndex);
        }
    
        const kebabCaseString = inputString
            .replace(/[^a-zA-Z0-9\s]/g, '') // Remove non-alphanumeric characters except spaces
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .toLowerCase(); // Convert to lowercase
        
        return kebabCaseString + '-' + randomLetters;
    }

    function handleDeployClick() {
        setDeployOpen(true);

        const htmlContent = mdToHtml();
        const kebabFilename = kebabCase(filename);
        setFilename(kebabCase);

        deployWebsite(htmlContent, kebabFilename);
    }

    return (
        <>
            <Button
                onClick={handleDeployClick}
                sx={{
                    color: 'primary.dark',
                    padding: 0,
                    paddingRight: 1,
                    textTransform: 'none',
                }}
            >
                Deploy
            </Button>

            <Snackbar open={deployOpen} autoHideDuration={4000} onClose={handleDeployClose}>
                <Alert onClose={handleDeployClose} severity="info" sx={{ width: '100%' }}>
                    Deploying website...
                </Alert>
            </Snackbar>
            <Snackbar 
              open={successOpen}
              autoHideDuration={10000}
              onClose={handleSuccessClose}
              action={
                <React.Fragment>
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    sx={{ p: 0.5 }}
                    onClick={handleSuccessClose}
                  >
                    <CloseIcon />
                  </IconButton>
                </React.Fragment>
              }
            >
                <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
                    Check out your new website at markin-{filename}.web.app
                </Alert>
            </Snackbar>
        </>
    )
}

export default DeployButton;