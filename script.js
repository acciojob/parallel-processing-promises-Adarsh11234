// Retrieve the necessary elements from the DOM
const outputDiv = document.getElementById('output');
const errorDiv = document.getElementById('error');
const loadingDiv = document.getElementById('loading');

// Function to download an image from a URL
function downloadImage(image) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.url;

        img.onload = () => {
            resolve(img);
        };

        img.onerror = () => {
            reject(`Failed to load image's URL: ${image.url}`);
        };
    });
}

// Function to handle downloading all images in parallel
async function downloadAllImages(images) {
    // Clear previous output and error messages
    outputDiv.innerHTML = '';
    errorDiv.textContent = '';

    // Show the loading spinner
    loadingDiv.style.display = 'block';

    try {
        // Use Promise.all to download all images in parallel
        const downloadedImages = await Promise.all(images.map(image => downloadImage(image)));

        // Hide the loading spinner
        loadingDiv.style.display = 'none';

        // Display the downloaded images in the output div
        downloadedImages.forEach(img => {
            outputDiv.appendChild(img);
        });
    } catch (error) {
        // Hide the loading spinner
        loadingDiv.style.display = 'none';

        // Display the error message in the error div
        errorDiv.textContent = error;
    }
}

// Example usage
const images = [
    { url: 'https://example.com/image1.jpg' },
    { url: 'https://example.com/image2.jpg' },
    { url: 'https://example.com/image3.jpg' }
];

// Call the function to download all images
downloadAllImages(images);