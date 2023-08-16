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
          { word: 'Giddy', sound: 'sounds/giddy.mp3', image: 'images/giddy.PNG' },
          { word: 'Mommy', sound: 'sounds/mommy.mp3', image: 'images/mommy.PNG' },
          { word: 'Daddy', sound: 'sounds/daddy.mp3', image: 'images/daddy.PNG' },
          { word: 'Toobie', sound: 'sounds/toobie.mp3', image: 'images/toobie.PNG' },
          { word: 'Grandma', sound: 'sounds/grandma.mp3', image: 'images/grandma.PNG' },
      ]
  },
  {
    name: "Feelings",
    words: [
        { word: 'Happy', sound: 'sounds/happy.mp3', image: 'images/happy.PNG' },
        { word: 'Mad', sound: 'sounds/mad.mp3', image: 'images/mad.PNG' },
        { word: 'Hungry', sound: 'sounds/hungry.mp3', image: 'images/hungry.PNG' },
        { word: 'Sleepy', sound: 'sounds/sleepy.mp3', image: 'images/sleepy.PNG' },
        { word: 'Sad', sound: 'sounds/sad.mp3', image: 'images/sad.PNG' },
    ]
  },
  {
    name: "Activities",
    words: [
        { word: 'Food', sound: 'sounds/food.mp3', image: 'images/food.PNG' },
        { word: 'Crayons', sound: 'sounds/crayons.mp3', image: 'images/crayons.PNG' },
        { word: 'Music', sound: 'sounds/music.mp3', image: 'images/music.PNG' },
        { word: 'Outside', sound: 'sounds/outside.mp3', image: 'images/outside.PNG' },
        { word: 'Bath', sound: 'sounds/bath.mp3', image: 'images/bath.PNG' },
    ]
  },
  {
    name: "Verbs",
    words: [
        { word: 'Want', sound: 'sounds/want.mp3', image: 'images/want.PNG' },
        { word: 'Hugs', sound: 'sounds/hugs.mp3', image: 'images/hugs.PNG' },
        { word: 'Listen', sound: 'sounds/listen.mp3', image: 'images/listen.PNG' },
        { word: 'Help', sound: 'sounds/help.mp3', image: 'images/help.PNG' },
        { word: 'Love You', sound: 'sounds/loveyou.mp3', image: 'images/loveyou.PNG' },
    ]
  },
  {
    name: "Connections",
    words: [
        { word: 'Yes', sound: 'sounds/yes.mp3', image: 'images/yes.PNG' },
        { word: 'No', sound: 'sounds/no.mp3', image: 'images/no.PNG' },
        { word: 'Hm?', sound: 'sounds/hm.mp3', image: 'images/hm.PNG' },
        { word: "Where's", sound: 'sounds/where.mp3', image: 'images/where.PNG' },
        { word: 'why?', sound: 'sounds/why.mp3', image: 'images/why.PNG' },
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


// Start App
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


