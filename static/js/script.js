document.addEventListener('DOMContentLoaded', function() {
    // Main application sections
    const mainApplicationsSection = document.querySelector('.ai-applications-container');
    const oneHotVectorsApp = document.getElementById('one-hot-vectors-app');
    const tokenCheckerApp = document.getElementById('token-checker-app');
    const animalSelectorApp = document.getElementById('animal-selector-app');
    const fileUploadApp = document.getElementById('file-upload-app');

    // Navigation buttons/links
    const openAppButtons = document.querySelectorAll('.btn-app-link[data-target]');
    const backToMainLinks = document.querySelectorAll('.back-to-main');

    // --- SPA Navigation Logic ---
    openAppButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetAppId = this.dataset.target;

            // Hide main applications and show target app
            mainApplicationsSection.style.display = 'none';
            if (oneHotVectorsApp) oneHotVectorsApp.style.display = 'none';
            if (tokenCheckerApp) tokenCheckerApp.style.display = 'none';
            if (animalSelectorApp) animalSelectorApp.style.display = 'none';
            if (fileUploadApp) fileUploadApp.style.display = 'none';

            const targetApp = document.getElementById(targetAppId);
            if (targetApp) {
                targetApp.style.display = 'block';
            }
        });
    });

    backToMainLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Hide current app and show main applications
            if (oneHotVectorsApp) oneHotVectorsApp.style.display = 'none';
            if (tokenCheckerApp) tokenCheckerApp.style.display = 'none';
            if (animalSelectorApp) animalSelectorApp.style.display = 'none';
            if (fileUploadApp) fileUploadApp.style.display = 'none';
            mainApplicationsSection.style.display = 'grid'; // Or 'block' depending on its default display
        });
    });

    // --- Animal selection functionality (existing) ---
    const animalCheckboxes = animalSelectorApp.querySelectorAll('input[name="animal"]');
    const animalImage = animalSelectorApp.querySelector('#animal-image');
    const animalMessage = animalSelectorApp.querySelector('#animal-message');

    animalCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            animalCheckboxes.forEach(cb => {
                if (cb !== this) {
                    cb.checked = false;
                }
            });

            if (this.checked) {
                const animal = this.value;
                showAnimalImage(animal);
            } else {
                hideAnimalImage();
            }
        });
    });

    function showAnimalImage(animal) {
        animalMessage.textContent = 'Loading...';
        animalMessage.style.display = 'block';
        animalImage.style.display = 'none';

        fetch(`/get_animal_image/${animal}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    animalMessage.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 80px; margin-bottom: 10px;">${data.emoji}</div>
                            <div style="font-size: 24px; color: #667eea; font-weight: bold;">${data.name}</div>
                        </div>
                    `;
                    animalMessage.style.display = 'block';
                    animalImage.style.display = 'none';
                } else {
                    animalMessage.textContent = 'Error loading animal';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                animalMessage.textContent = 'Error loading animal';
            });
    }

    function hideAnimalImage() {
        animalImage.style.display = 'none';
        animalMessage.style.display = 'block';
        animalMessage.innerHTML = 'Select an animal to see its image';
    }

    // --- File upload functionality (existing) ---
    const fileInput = fileUploadApp.querySelector('#file-input');
    const uploadArea = fileUploadApp.querySelector('#upload-area');
    const fileInfo = fileUploadApp.querySelector('#file-info');
    const fileName = fileUploadApp.querySelector('#file-name');
    const fileSize = fileUploadApp.querySelector('#file-size');
    const fileType = fileUploadApp.querySelector('#file-type');

    fileInput.addEventListener('change', handleFileSelection);

    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            handleFileSelection();
        }
    });

    function handleFileSelection() {
        const file = fileInput.files[0];
        
        if (!file) {
            fileInfo.style.display = 'none';
            return;
        }

        fileName.textContent = 'Uploading...';
        fileSize.textContent = 'Please wait...';
        fileType.textContent = 'Processing...';
        fileInfo.style.display = 'block';

        const formData = new FormData();
        formData.append('file', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error: ' + data.error);
                fileInfo.style.display = 'none';
            } else {
                fileName.textContent = data.name;
                fileSize.textContent = data.size_formatted + ' (' + data.size + ' bytes)';
                fileType.textContent = data.type;
                fileInfo.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error uploading file');
            fileInfo.style.display = 'none';
        });
    }

    animalCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('.checkbox-label');
            if (this.checked) {
                label.style.fontWeight = 'bold';
                label.style.color = '#667eea';
            } else {
                label.style.fontWeight = 'normal';
                label.style.color = '#555';
            }
        });
    });

    fileInput.addEventListener('focus', function() {
        uploadArea.style.borderColor = '#667eea';
    });

    fileInput.addEventListener('blur', function() {
        uploadArea.style.borderColor = '#ddd';
    });

    // --- One-Hot Vectors functionality (new) ---
    const ohvWordsInput = document.getElementById('words-input');
    const ohvProcessButton = document.getElementById('process-button');
    const ohvResultsSection = oneHotVectorsApp.querySelector('#results'); // Scoped to oneHotVectorsApp
    const ohvVectorOutput = oneHotVectorsApp.querySelector('#vector-output'); // Scoped
    const ohvErrorMessage = oneHotVectorsApp.querySelector('#error-message'); // Scoped

    if (ohvProcessButton) {
        ohvProcessButton.addEventListener('click', async function() {
            const rawWords = ohvWordsInput.value.trim();
            if (!rawWords) {
                displayOHVError('Please enter some words.');
                return;
            }

            const words = rawWords.split(/[\s,]+/).filter(word => word.length > 0);
            if (words.length < 1) {
                displayOHVError('Please enter at least one word.');
                return;
            }
            
            ohvErrorMessage.style.display = 'none';
            ohvResultsSection.style.display = 'block';
            ohvVectorOutput.innerHTML = '<p>Processing...</p>';

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
                    displayOHVError(data.error);
                } else {
                    displayOneHotVectors(data.unique_words, data.one_hot_vectors, words);
                }
            } catch (error) {
                console.error('Error:', error);
                displayOHVError('An unexpected error occurred. Please try again.');
            }
        });
    }

    function displayOneHotVectors(uniqueWords, oneHotVectors, originalWords) {
        if (uniqueWords.length === 0) {
            ohvVectorOutput.innerHTML = '<p>No unique words found to create vectors.</p>';
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
        ohvVectorOutput.innerHTML = tableHTML;
    }

    function displayOHVError(message) {
        ohvErrorMessage.textContent = message;
        ohvErrorMessage.style.display = 'block';
        ohvResultsSection.style.display = 'block';
        ohvVectorOutput.innerHTML = ''; // Clear previous results
    }

    // --- Token Length Checker functionality (new) ---
    const tlParagraphInput = document.getElementById('paragraph-input');
    const tlCountTokensButton = document.getElementById('count-tokens-button');
    const tlResultsSection = tokenCheckerApp.querySelector('#results'); // Scoped to tokenCheckerApp
    const tlTokenCountDisplay = tokenCheckerApp.querySelector('#token-count-display'); // Scoped
    const tlErrorMessage = tokenCheckerApp.querySelector('#error-message'); // Scoped

    if (tlCountTokensButton) {
        tlCountTokensButton.addEventListener('click', async function() {
            const paragraph = tlParagraphInput.value.trim();
            
            tlErrorMessage.style.display = 'none';
            tlResultsSection.style.display = 'block';
            tlTokenCountDisplay.textContent = 'Calculating...';

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
                    displayTLError(data.error);
                } else {
                    tlTokenCountDisplay.textContent = data.token_count;
                }
            } catch (error) {
                console.error('Error:', error);
                displayTLError('An unexpected error occurred. Please try again.');
            }
        });
    }

    function displayTLError(message) {
        tlErrorMessage.textContent = message;
        tlErrorMessage.style.display = 'block';
        tlResultsSection.style.display = 'block';
        tlTokenCountDisplay.textContent = 'Error'; // Indicate an error state
    }

    // Initial state: show main applications, hide others
    mainApplicationsSection.style.display = 'grid';
    if (animalSelectorApp) animalSelectorApp.style.display = 'none';
    if (fileUploadApp) fileUploadApp.style.display = 'none';
    if (oneHotVectorsApp) oneHotVectorsApp.style.display = 'none';
    if (tokenCheckerApp) tokenCheckerApp.style.display = 'none';
});
