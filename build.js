const fs = require('fs');
const path = require('path');

const sourceFile = 'main.webp';
const destinationDirectory = 'img';
const numCopies = 100000;

async function copyImage() {
  try {
    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(destinationDirectory)) {
      fs.mkdirSync(destinationDirectory);
    }

    // Read the source image file
    const sourceData = fs.readFileSync(sourceFile);

    // Copy the image file to the destination directory in parallel
    const copyPromises = [];
    for (let i = 1; i <= numCopies; i++) {
      const destinationFile = path.join(destinationDirectory, `${i}.webp`);
      const copyPromise = fs.promises.writeFile(destinationFile, sourceData);
      copyPromises.push(copyPromise);
    }
    await Promise.all(copyPromises);

    console.log(`Successfully copied ${numCopies} images.`);
  } catch (error) {
    console.error('An error occurred while copying the images:', error);
  }
}

copyImage();
