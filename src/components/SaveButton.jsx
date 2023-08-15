import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

function SaveButton({ defaultFileName, currentText }) {
    const [filename, setFilename] = useState(defaultFileName);

    function download(inputName) {
        if (!inputName) {
            alert('download failed -- you need to give me a filename bro');
            return;
        }

        const blob = new Blob([currentText], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = inputName;

        document.body.appendChild(link);

        // Use a timeout to ensure the link is added to the DOM before clicking it
        setTimeout(() => {
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            alert(`successfully downloaded ${inputName}.md to your computer!`);
        }, 0);
    }

    function downloadMarkdown() {
        if (!filename) {
            const newFilename = prompt('Enter a filename');
            if (newFilename !== null) {
                setFilename(newFilename);
                download(newFilename);
            }
        } else {
            download(filename);
        }
    }

    return (
        <IconButton
            onClick={downloadMarkdown}
            sx={{
                color: 'primary.dark',
                padding: 0,
                paddingRight: 1,
            }}
        >
            <SaveIcon />
        </IconButton>
    )
}

export default SaveButton;