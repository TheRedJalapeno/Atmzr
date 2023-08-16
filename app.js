/**
 * Atmzr - Toddler Communication Tool
 * Helps toddlers learn to communicate with words through a tablet-friendly interface of word-buttons.
 * 
 * Author: Robert Allen
 * Date: 2023-08-16
 */

// Data for the word-buttons
const groups = [
  {
      name: "People",
      words: [
          { word: 'Giddy', sound: 'sounds/giddy.mp3', image: 'images/giddy.png' },
          { word: 'Mommy', sound: 'sounds/mommy.mp3', image: 'images/mommy.png' },
          { word: 'Daddy', sound: 'sounds/daddy.mp3', image: 'images/daddy.png' },
          { word: 'Toobie', sound: 'sounds/toobie.mp3', image: 'images/toobie.png' },
          { word: 'Grandma', sound: 'sounds/grandma.mp3', image: 'images/grandma.png' },
      ]
  },
  {
    name: "Feelings",
    words: [
        { word: 'Happy', sound: 'sounds/happy.mp3', image: 'images/happy.png' },
        { word: 'Mad', sound: 'sounds/mad.mp3', image: 'images/mad.png' },
        { word: 'Hungry', sound: 'sounds/hungry.mp3', image: 'images/hungry.png' },
        { word: 'Sleepy', sound: 'sounds/sleepy.mp3', image: 'images/sleepy.png' },
        { word: 'Sad', sound: 'sounds/sad.mp3', image: 'images/sad.png' },
    ]
  },
  {
    name: "Activities",
    words: [
        { word: 'Food', sound: 'sounds/food.mp3', image: 'images/food.png' },
        { word: 'Crayons', sound: 'sounds/crayons.mp3', image: 'images/crayons.png' },
        { word: 'Music', sound: 'sounds/music.mp3', image: 'images/music.png' },
        { word: 'Outside', sound: 'sounds/outside.mp3', image: 'images/outside.png' },
        { word: 'Bath', sound: 'sounds/bath.mp3', image: 'images/bath.png' },
    ]
  },
  {
    name: "Verbs",
    words: [
        { word: 'Want', sound: 'sounds/want.mp3', image: 'images/want.png' },
        { word: 'Hugs', sound: 'sounds/hugs.mp3', image: 'images/hugs.png' },
        { word: 'Listen', sound: 'sounds/listen.mp3', image: 'images/listen.png' },
        { word: 'Help', sound: 'sounds/help.mp3', image: 'images/help.png' },
        { word: 'Love You', sound: 'sounds/loveyou.mp3', image: 'images/loveyou.png' },
    ]
  },
  {
    name: "Connections",
    words: [
        { word: 'Yes', sound: 'sounds/yes.mp3', image: 'images/yes.png' },
        { word: 'No', sound: 'sounds/no.mp3', image: 'images/no.png' },
        { word: 'Hm?', sound: 'sounds/hm.mp3', image: 'images/hm.png' },
        { word: "Where's", sound: 'sounds/where.mp3', image: 'images/where.png' },
        { word: 'why?', sound: 'sounds/why.mp3', image: 'images/why.png' },
    ]
  },
];


// Cache for sounds
const soundCache = {};

/**
* Preload and cache a sound using Howler.js
* @param {string} src - The path to the sound file.
* @returns {Promise} - Resolves when the sound is loaded and cached.
*/
function loadSound(src) {
  return new Promise((resolve, reject) => {
      if (soundCache[src]) {
          // Sound is already cached; resolve immediately
          resolve();
          return;
      }

      const sound = new Howl({
          src: [src],
          preload: true,
          html5: true,
          onload: () => {
              soundCache[src] = sound;
              resolve();
          },
          onloaderror: (id, err) => {
              console.error(`Error loading sound ${src}:`, err);
              reject(err);
          }
      });
  });
}

// Preload all sounds
Promise.all(groups.flatMap(group => group.words.map(word => loadSound(word.sound))))
  .then(() => {
      console.log("All sounds are preloaded and cached.");
  })
  .catch(err => {
      console.error("There was an error preloading some sounds:", err);
  });

// Cache for images using canvases
const imageCanvasCache = {};

/**
* Load, resize, and cache images as canvases for better performance

function cacheImages() {
  groups.flatMap(group => group.words).forEach(function (word) {
      if (word.image) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = word.radius * 2; // This assumes that each word has a 'radius' property.
            canvas.height = word.radius * 2;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            imageCanvasCache[word.image] = canvas;
        };
        img.src = word.image;
      }
  });
}
cacheImages();
*/

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('buttonContainer');

  groups.forEach(group => {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'group';

      group.words.forEach(obj => {
          const button = document.createElement('button');
          
          // Directly use the image URL
          if (obj.image) {
              const wordImage = document.createElement('img');
              wordImage.src = obj.image;
              wordImage.alt = obj.word;
              wordImage.style.width = '70%';
              button.appendChild(wordImage);
          }

          const wordSpan = document.createElement('span');
          wordSpan.innerText = obj.word;
          button.appendChild(wordSpan);

          button.addEventListener('click', () => {
              if (soundCache[obj.sound]) {
                  soundCache[obj.sound].play();
              }
          });

          groupDiv.appendChild(button);
      });
      const groupName = document.createElement('h2');
      groupName.innerText = group.name;
      groupDiv.appendChild(groupName);

      container.appendChild(groupDiv);
  });
});


