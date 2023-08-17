import React, { useState } from 'react';
import { Button } from '@mui/material';
import MarkdownIt from 'markdown-it';

function DeployButton({ currentText }) {
    const md = new MarkdownIt();

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
                const json = response.json();
                console.log(json);
                console.log(htmlContent);

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
        return html;
    }

    function handleDeployClick() {
        const htmlContent = mdToHtml();
        // TODO: Change from random string to word
        const randomString = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
        const filename = randomString;

        deployWebsite(htmlContent, filename);
    }
    return (
        <Button
            onClick={handleDeployClick}
            sx={{
                color: 'primary.dark',
                padding: 0,
                paddingRight: 1,
            }}
        >
            Deploy
        </Button>
    )
}

export default DeployButton;