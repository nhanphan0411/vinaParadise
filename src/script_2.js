const track = document.querySelector('.carousel-track');
let imageList = [];

// Function to create an image element
function createImageElement(url) {
  const img = document.createElement('img');
  img.src = url;
  img.className = 'carousel-image';

  // Event listener to handle broken images
  img.onerror = () => {
    console.error(`Image failed to load: ${url}`);
    img.remove();  // Remove the image if it can't be loaded
  };

  return img;
}

// Populate the carousel with images from JSON
function populateCarousel() {
  imageList.forEach((url) => {
    const img = createImageElement(url);
    track.appendChild(img);
  });

  // Set the animation duration based on the total width of images
  // setAnimationProperties();
}

// Calculate the total width of all images and adjust animation properties
function setAnimationProperties() {
  const images = document.querySelectorAll('.carousel-image');
  let totalWidth = 0;

  images.forEach((img) => {
    totalWidth += img.getBoundingClientRect().width;
  });

  // Set the transform value to reflect the total width
  track.style.transform = `translateX(0)`;
  
  // Set the animation duration based on the total width of the images
  const animationDuration = totalWidth / 50; // Adjust this factor based on speed preference
  track.style.animationDuration = `${animationDuration}s`;
}


// Fetch images from JSON file
async function fetchImages() {
  try {
    const response = await fetch('assets/data.json');
    const data = await response.json();
    imageList = shuffleArray(data['imgs']);

    populateCarousel();
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

// Initialize the carousel
fetchImages();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Get a random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array; // Return the shuffled array
}