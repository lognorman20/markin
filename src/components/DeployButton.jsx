import React, { useState, useEffect } from 'react';
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
    const [realName, setRealName] = React.useState(defaultFilename);

    useEffect(() => {
        setRealName(defaultFilename);
    }, [defaultFilename]);

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

    async function deployWebsite(htmlContent, websiteName) {
        if (!websiteName | websiteName.includes('your-file')) {
            console.log(`website name null or set to generic: ${websiteName}`);
        } else {
            console.log(`the website name passed in is ${websiteName}`);
        }

        const data = {
            html: htmlContent,
            filename: websiteName
        };

        console.log('trying to deploy website..');
        console.log(`filename: ${websiteName}`);

        try {
            const response = await fetch('https://fir-server-123.web.app/create-html', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setDeployOpen(false);
                const json = response.json();
                console.log(json);

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
        console.log(`input to kebab fn: ${inputString}`);

        if (!inputString) {
            console.log("nah that didnt' work");
            inputString = 'your file';
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
        const kebabFilename = kebabCase(realName);

        setRealName(kebabFilename);
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

            <Snackbar open={deployOpen} onClose={handleDeployClose}>
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
                    Check out your new website at markin-{realName}.web.app
                </Alert>
            </Snackbar>
        </>
    )
}

export default DeployButton;