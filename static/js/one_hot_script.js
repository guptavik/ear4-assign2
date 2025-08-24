document.addEventListener('DOMContentLoaded', function() {
    const wordsInput = document.getElementById('words-input');
    const processButton = document.getElementById('process-button');
    const resultsSection = document.getElementById('results');
    const vectorOutput = document.getElementById('vector-output');
    const errorMessage = document.getElementById('error-message');

    processButton.addEventListener('click', async function() {
        const rawWords = wordsInput.value.trim();
        if (!rawWords) {
            displayError('Please enter some words.');
            return;
        }

        const words = rawWords.split(/[\s,]+/).filter(word => word.length > 0);
        if (words.length < 1) {
            displayError('Please enter at least one word.');
            return;
        }
        
        errorMessage.style.display = 'none';
        resultsSection.style.display = 'block';
        vectorOutput.innerHTML = '<p>Processing...</p>';

        try {
            const response = await fetch('/api/one_hot_encode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ words: words })
            });

            const data = await response.json();

            if (data.error) {
                displayError(data.error);
            } else {
                displayOneHotVectors(data.unique_words, data.one_hot_vectors, words);
            }
        } catch (error) {
            console.error('Error:', error);
            displayError('An unexpected error occurred. Please try again.');
        }
    });

    function displayOneHotVectors(uniqueWords, oneHotVectors, originalWords) {
        if (uniqueWords.length === 0) {
            vectorOutput.innerHTML = '<p>No unique words found to create vectors.</p>';
            return;
        }

        let tableHTML = '<div class="vector-table-container">';
        tableHTML += '<table class="vector-table"><thead><tr>';
        tableHTML += '<th>Word</th>';
        uniqueWords.forEach(word => {
            tableHTML += `<th>${word}</th>`;
        });
        tableHTML += '</tr></thead><tbody>';

        originalWords.forEach((word, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="word-col">${word}</td>`;
            oneHotVectors[index].forEach(bit => {
                tableHTML += `<td class="${bit === 1 ? 'one' : 'zero'}">${bit}</td>`;
            });
            tableHTML += '</tr>';
        });

        tableHTML += '</tbody></table></div>';
        vectorOutput.innerHTML = tableHTML;
    }

    function displayError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        resultsSection.style.display = 'block';
        vectorOutput.innerHTML = ''; // Clear previous results
    }
});
