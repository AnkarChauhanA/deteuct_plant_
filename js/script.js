
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const imagePreview = document.getElementById('imagePreview');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const resetBtn = document.getElementById('resetBtn');
        const loading = document.getElementById('loading');
        const resultContainer = document.getElementById('resultContainer');
        const lensIcon = document.getElementById('lensIcon');

        // Sample disease database for demonstration
        const diseaseDatabase = [
            {
                name: "Healthy Plant",
                confidence: 92,
                symptoms: "The plant appears healthy with vibrant green foliage, no visible spots or discoloration, and strong structural integrity.",
                treatment: "Continue regular watering and maintain good lighting conditions. Monitor for any changes in appearance.",
                isHealthy: true
            },
            {
                name: "Leaf Spot Disease",
                confidence: 87,
                symptoms: "Circular brown or black spots on leaves, yellowing around spots, and potential leaf drop in severe cases.",
                treatment: "Remove affected leaves, improve air circulation, avoid overhead watering, and consider applying copper-based fungicide.",
                isHealthy: false
            },
            {
                name: "Powdery Mildew",
                confidence: 94,
                symptoms: "White powdery coating on leaves and stems, yellowing leaves, and stunted growth.",
                treatment: "Increase air circulation, reduce humidity, remove affected parts, and apply fungicidal spray or neem oil.",
                isHealthy: false
            },
            {
                name: "Bacterial Blight",
                confidence: 79,
                symptoms: "Water-soaked spots that turn brown or black, yellowing leaves, and wilting of plant parts.",
                treatment: "Remove infected plant parts, avoid overhead watering, improve drainage, and apply copper-based bactericide.",
                isHealthy: false
            },
            {
                name: "Nutrient Deficiency",
                confidence: 85,
                symptoms: "Yellowing leaves (starting from older leaves), stunted growth, and poor overall plant vigor.",
                treatment: "Apply balanced fertilizer, check soil pH, ensure proper drainage, and consider soil testing.",
                isHealthy: false
            }
        ];

        // Event listeners
        uploadArea.addEventListener('click', () => fileInput.click());
        lensIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            fileInput.click();
        });
        fileInput.addEventListener('change', handleFileSelect);
        analyzeBtn.addEventListener('click', analyzeImage);
        resetBtn.addEventListener('click', resetUpload);

        // Drag and drop functionality
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFile(files[0]);
            }
        });

        function handleFileSelect(e) {
            const file = e.target.files[0];
            if (file) {
                handleFile(file);
            }
        }

        function handleFile(file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file.');
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                alert('File size must be less than 10MB.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                analyzeBtn.style.display = 'inline-block';
                resetBtn.style.display = 'inline-block';
                uploadArea.style.display = 'none';
                resultContainer.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }

        function analyzeImage() {
            // Show loading state
            loading.style.display = 'block';
            analyzeBtn.style.display = 'none';
            resultContainer.style.display = 'none';

            // Simulate AI analysis with random result
            setTimeout(() => {
                const randomDisease = diseaseDatabase[Math.floor(Math.random() * diseaseDatabase.length)];
                displayResults(randomDisease);
                loading.style.display = 'none';
            }, 2000 + Math.random() * 1000); // Random delay between 2-3 seconds
        }

        function displayResults(disease) {
            const statusIcon = document.getElementById('statusIcon');
            const resultTitle = document.getElementById('resultTitle');
            const diseaseName = document.getElementById('diseaseName');
            const confidence = document.getElementById('confidence');
            const symptomsText = document.getElementById('symptomsText');
            const treatmentText = document.getElementById('treatmentText');

            // Update status icon and styling
            if (disease.isHealthy) {
                statusIcon.textContent = '✓';
                statusIcon.className = 'status-icon status-healthy';
            } else {
                statusIcon.textContent = '⚠';
                statusIcon.className = 'status-icon status-diseased';
            }

            // Update content
            diseaseName.textContent = disease.name;
            confidence.textContent = `Confidence: ${disease.confidence}%`;
            symptomsText.textContent = disease.symptoms;
            treatmentText.textContent = disease.treatment;

            // Show results
            resultContainer.style.display = 'block';
            
            // Scroll to results
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        function resetUpload() {
            fileInput.value = '';
            imagePreview.style.display = 'none';
            analyzeBtn.style.display = 'none';
            resetBtn.style.display = 'none';
            uploadArea.style.display = 'block';
            resultContainer.style.display = 'none';
            loading.style.display = 'none';
        }

        // Add subtle animations on page load
        window.addEventListener('load', () => {
            document.querySelector('.container').style.animation = 'fadeInUp 0.8s ease-out';
        });

        // Add CSS for fade in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
