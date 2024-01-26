 const categories = [
      {
        name: 'Sight',
        words: [
            'Glistening dew', 'Radiant sunset', 'Whispering shadows', 'Ethereal mist', 'Vibrant mosaic', 
            'Luminous spark', 'Enchanting twilight', 'Starlit dance', 'Prism embrace', 'Moonlit dreams', 
            'Shimmering horizon', 'Cosmic bloom', 'Mystical glow', 'Blossoming hues', 'Velvet skyline', 
            'Twilight veil', 'Celestial whisper', 'Enigmatic gaze', 'Ephemeral charm', 'Spectral serenity'
        ]
      },
      {
        name: 'Sound',
        words: [
            'Harmonic echo', 'Whispering breeze', 'Melodic laughter', 'Echoing heartbeat', 'Gentle hum', 
            'Serene rustle', 'Resonant pulse', 'Tranquil lull', 'Echoed serenade', 'Ambient cadence', 
            'Soothing chorus', 'Subtle hymn', 'Velvet symphony', 'Tranquil pulse', 'Whispered melody', 
            'Echoing stillness', 'Enigmatic sonnet', 'Echoes of silence', 'Rhythmic breath', 'Harmonic whispers'
        ]
      },
      {
        name: 'Smell',
        words: [
            'Citrus zephyr', 'Petrichor breeze', 'Floral nectar', 'Vanilla embrace', 'Aromatic whispers', 
            'Lavender mist', 'Sandalwood serenade', 'Fresh rain', 'Cedarwood allure', 'Spice infused', 'Oceanic breeze', 
            'Zesty burst', 'Scented silence', 'Earthy charm', 'Cinnamon dreams', 'Rose petal sigh', 'Pine forest essence', 
            'Oceanic drift', 'Amber embrace', 'Incense trails'
        ]
      },
      {
        name: 'Taste',
        words: [
            'Blissful nectar', 'Honeyed essence', 'Velvet sweetness', 'Juicy burst', 'Zestful spark', 'Bitter bliss', 
            'Sugared whispers', 'Citrus kiss', 'Luscious melody', 'Caramel dream', 'Tangy allure', 'Velvety symphony', 
            'Blissful bite', 'Spiced ecstasy', 'Tart infusion', 'Silken pleasure', 
            'Sweet serenity', 'Nectarous bloom', 'Cocoa whispers', 'Ambrosial feast'
        ]
      },
      {
        name: 'Touch',
        words: [
            'Silk caress', 'Velvet touch', 'Satin embrace', 'Feathered graze', 'Breeze-kissed', 'Gentle stroke', 
            'Tender whisper', 'Petal soft', 'Cashmere dreams', 'Plush grace', 'Ephemeral touch', 'Pearly caress', 
            'Silken symphony', 'Frosted graze', 'Suede warmth', 'Velvet bloom', 
            'Softest breeze', 'Quilted comfort', 'Padded embrace', 'Felted serenity'
        ]
      }
    ];

const outerBox = document.getElementById('outerBox');
const wordBox = document.getElementById('wordBox');
const mirrorBoxes = document.querySelectorAll('.mirrorBox');
let currentIndex = 0;

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    changeWords();
  }
});

function changeWords() {
  currentIndex = (currentIndex + 1) % categories.length;
  displayWords();
}

function displayWords() {
  const selectedCategories = getRandomCategories();
  const words = selectedCategories.map(category => getRandomWord(category));

  // Display words in the original box
  wordBox.innerHTML = '';
  const margin = 10; // Adjust margin as needed
  const spaceBetweenWords = 20; // Adjust the space between words as needed

  let currentLeft = margin;

  words.forEach((word, index) => {
    const wordElement = createWordElement(word, index);
    fitWordSize(wordElement);
    positionWord(wordElement, currentLeft);
    wordBox.appendChild(wordElement);

    currentLeft += wordElement.offsetWidth + spaceBetweenWords;
  });

function createWordElement(word, index) {
  const wordElement = document.createElement('div');
  wordElement.className = 'word';
  wordElement.textContent = word;

  // Set font size based on a base size with a slight variation
  const baseFontSize = 1.2; // Set your desired base font size
  const fontSizeVariation = Math.random() * 0.5; // Adjust the range of variation
  const fontSize = baseFontSize + fontSizeVariation + 'em';
  wordElement.style.fontSize = fontSize;

  wordElement.style.fontFamily = index % 2 === 0 ? 'Arial' : 'Georgia';
  wordElement.style.color = getRandomColor();
  wordElement.style.position = 'absolute';
  wordElement.style.whiteSpace = 'nowrap';

  const angle = Math.random() * 30 - 15; // Random angle between -15 and 15 degrees
  wordElement.style.transform = `rotate(${angle}deg)`;
  wordElement.style.transformOrigin = '50% 50%';

  return wordElement;
}

function fitWordSize(wordElement) {
  let fontSize = 1;
  while (wordElement.offsetHeight > wordBox.offsetHeight || wordElement.offsetWidth > wordBox.offsetWidth) {
    fontSize -= 0.1;
    wordElement.style.fontSize = `${fontSize}em`;
  }
}



function positionWord(wordElement) {
  const marginPercentage = 0.1; // Adjust margin as needed (10% in this case)

  const bufferX = wordBox.offsetWidth * marginPercentage;
  const bufferY = wordBox.offsetHeight * marginPercentage;

  const maxWidth = wordBox.offsetWidth - 2 * bufferX;
  const maxHeight = wordBox.offsetHeight - 2 * bufferY;

  let isIntersecting = true;
  let attempts = 0;
  const maxAttempts = 50;

  while (isIntersecting && attempts < maxAttempts) {
    let randomLeft = bufferX + Math.random() * maxWidth;
    let randomTop = bufferY + Math.random() * maxHeight;

    // Adjust the randomLeft to ensure the entire word is within the box
    if (randomLeft < bufferX) {
      randomLeft = bufferX;
    } else if (randomLeft + wordElement.offsetWidth > wordBox.offsetWidth - bufferX) {
      randomLeft = wordBox.offsetWidth - wordElement.offsetWidth - bufferX;
    }

    // Adjust the randomTop to ensure the entire word is within the box
    if (randomTop < bufferY) {
      randomTop = bufferY;
    } else if (randomTop + wordElement.offsetHeight > wordBox.offsetHeight - bufferY) {
      randomTop = wordBox.offsetHeight - wordElement.offsetHeight - bufferY;
    }

    // Check for intersection with existing words
    isIntersecting = checkIntersection(wordElement, randomLeft, randomTop, bufferX, bufferY);

    if (!isIntersecting) {
      wordElement.style.left = `${randomLeft}px`;
      wordElement.style.top = `${randomTop}px`;
    }

    attempts++;
  }
}








function checkIntersection(wordElement, left, top, bufferX, bufferY) {
  const elements = wordBox.getElementsByClassName('word');
  const bufferIntersection = 10; // Adjust buffer as needed

  for (let element of elements) {
    if (element !== wordElement) {
      const rect1 = wordElement.getBoundingClientRect();
      const rect2 = element.getBoundingClientRect();

      if (
        rect1.left - bufferIntersection < rect2.right &&
        rect1.right + bufferIntersection > rect2.left &&
        rect1.top - bufferIntersection < rect2.bottom &&
        rect1.bottom + bufferIntersection > rect2.top
      ) {
        return true; // Intersection detected
      }
    }
  }

  // Check if the word is outside the buffer zones
  const outsideBuffer =
    left < bufferX ||
    left + wordElement.offsetWidth > wordBox.offsetWidth - bufferX ||
    top < bufferY ||
    top + wordElement.offsetHeight > wordBox.offsetHeight - bufferY;

  return outsideBuffer;
}



// Mirror words to other boxes
mirrorBoxes.forEach((mirrorBox, index) => {
  if (index !== 0) {
    mirrorBox.innerHTML = wordBox.innerHTML;
    applyMirrorTransformation(mirrorBox);
  }
});
}


function applyMirrorTransformation(mirrorBox) {
  const scaleX = mirrorBox.classList.contains('mirroredX') ? -1 : 1;
  const scaleY = mirrorBox.classList.contains('mirroredY') ? -1 : 1;

  mirrorBox.style.transform = `scaleX(${scaleX}) scaleY(${scaleY})`;
}

function getRandomCategories() {
  const shuffledCategories = categories.slice();
  for (let i = shuffledCategories.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCategories[i], shuffledCategories[j]] = [shuffledCategories[j], shuffledCategories[i]];
  }
  return shuffledCategories.slice(0, 3);
}

function getRandomWord(category) {
  const words = category.words;
  return words[Math.floor(Math.random() * words.length)];
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Assuming categories is defined somewhere in your code

displayWords(); // Initial display
