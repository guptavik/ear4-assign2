document.addEventListener('DOMContentLoaded', function() {
    // Animal selection functionality
    const animalCheckboxes = document.querySelectorAll('input[name="animal"]');
    const animalImage = document.getElementById('animal-image');
    const animalMessage = document.getElementById('animal-message');

    // File upload functionality
    const fileInput = document.getElementById('file-input');
    const uploadArea = document.getElementById('upload-area');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const fileSize = document.getElementById('file-size');
    const fileType = document.getElementById('file-type');

    // Handle animal selection
    animalCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Uncheck other checkboxes (radio-like behavior)
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
        // Show loading state
        animalMessage.textContent = 'Loading...';
        animalMessage.style.display = 'block';
        animalImage.style.display = 'none';

        // Fetch animal data from backend
        fetch(`/get_animal_image/${animal}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Create a visual representation using emoji and styling
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

    // File upload functionality
    fileInput.addEventListener('change', handleFileSelection);

    // Drag and drop functionality
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

        // Show loading state
        fileName.textContent = 'Uploading...';
        fileSize.textContent = 'Please wait...';
        fileType.textContent = 'Processing...';
        fileInfo.style.display = 'block';

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('file', file);

        // Upload file to backend
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
                // Display file information
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

    // Add some visual feedback for interactions
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

    // Upload area visual feedback
    fileInput.addEventListener('focus', function() {
        uploadArea.style.borderColor = '#667eea';
    });

    fileInput.addEventListener('blur', function() {
        uploadArea.style.borderColor = '#ddd';
    });
});
