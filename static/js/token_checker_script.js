document.addEventListener('DOMContentLoaded', function() {
    const paragraphInput = document.getElementById('paragraph-input');
    const countTokensButton = document.getElementById('count-tokens-button');
    const resultsSection = document.getElementById('results');
    const tokenCountDisplay = document.getElementById('token-count-display');
    const errorMessage = document.getElementById('error-message');

    countTokensButton.addEventListener('click', async function() {
        const paragraph = paragraphInput.value.trim();
        
        errorMessage.style.display = 'none';
        resultsSection.style.display = 'block';
        tokenCountDisplay.textContent = 'Calculating...';

        try {
            const response = await fetch('/api/count_tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ paragraph: paragraph })
            });

            const data = await response.json();

            if (data.error) {
                displayError(data.error);
            } else {
                tokenCountDisplay.textContent = data.token_count;
            }
        } catch (error) {
            console.error('Error:', error);
            displayError('An unexpected error occurred. Please try again.');
        }
    });

    function displayError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        resultsSection.style.display = 'block';
        tokenCountDisplay.textContent = 'Error'; // Indicate an error state
    }
});
