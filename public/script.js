document.getElementById('summarizeButton').addEventListener('click', async function() {
    const inputText = document.getElementById('inputText').value;

    // Ensure that input text is not empty
    if (inputText.trim() === '') {
        alert('Please enter some text to summarize.');
        return;
    }

    try {
        // Send the input text to the backend /summarize route
        const response = await fetch('http://localhost:8080/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paragraph: inputText }), // send the paragraph as required by the backend
        });

        // Parse the JSON response from the backend
        const result = await response.json();
        
        // Display the summary in the output textarea
        if (result.summary) {
            document.getElementById('outputText').value = result.summary;
        } else {
            alert('Failed to summarize the text.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while summarizing. Please try again.');
    }
});

// Clear button functionality
document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
});
