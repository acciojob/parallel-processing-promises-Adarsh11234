const outputDiv = document.getElementById('output');
const errorDiv = document.getElementById('error');
const loadingDiv = document.getElementById('loading');
const downloadButton = document.getElementById('download-images-button');

function downloadImage(image) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
    });
}

async function downloadAllImages(images) {
    outputDiv.innerHTML = '';
    errorDiv.textContent = '';
    loadingDiv.style.display = 'block';

    try {
        const promises = images.map(image => 
            downloadImage(image).catch(error => Promise.reject(error))
        );
        const downloadedImages = await Promise.all(promises);
        downloadedImages.forEach(img => outputDiv.appendChild(img));
    } catch (error) {
        errorDiv.textContent = error;
    } finally {
        loadingDiv.style.display = 'none';
    }
}

// Example usage with test images
const testImages = [
    { url: 'https://via.placeholder.com/150' },
    { url: 'https://via.placeholder.com/250' },
    { url: 'https://invalid.url/image.jpg' } // Test error case
];

// Trigger download on button click
downloadButton.addEventListener('click', () => downloadAllImages(testImages));