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
          { word: 'Giddy', sound: 'sounds/giddy.mp3', image: 'images/img_giddy.png' },
          { word: 'Mommy', sound: 'sounds/mommy.mp3', image: 'images/img_mommy.png' },
          { word: 'Daddy', sound: 'sounds/daddy.mp3', image: 'images/img_daddy.png' },
          { word: 'Toobie', sound: 'sounds/toobie.mp3', image: 'images/img_toobie.png' },
          { word: 'Grandma', sound: 'sounds/grandma.mp3', image: 'images/img_grandma.png' },
      ]
  },
  {
    name: "Feelings",
    words: [
        { word: 'Happy', sound: 'sounds/happy.mp3', image: 'images/img_happy.png' },
        { word: 'Mad', sound: 'sounds/mad.mp3', image: 'images/img_mad.png' },
        { word: 'Hungry', sound: 'sounds/hungry.mp3', image: 'images/img_hungry.png' },
        { word: 'Sleepy', sound: 'sounds/sleepy.mp3', image: 'images/img_sleepy.png' },
        { word: 'Sad', sound: 'sounds/sad.mp3', image: 'images/img_sad.png' },
    ]
  },
  {
    name: "Activities",
    words: [
        { word: 'Food', sound: 'sounds/food.mp3', image: 'images/img_food.png' },
        { word: 'Crayons', sound: 'sounds/crayons.mp3', image: 'images/img_crayons.png' },
        { word: 'Music', sound: 'sounds/music.mp3', image: 'images/img_music.png' },
        { word: 'Outside', sound: 'sounds/outside.mp3', image: 'images/img_outside.png' },
        { word: 'Bath', sound: 'sounds/bath.mp3', image: 'images/img_bath.png' },
    ]
  },
  {
    name: "Verbs",
    words: [
        { word: 'Want', sound: 'sounds/want.mp3', image: 'images/img_want.png' },
        { word: 'Hugs', sound: 'sounds/hugs.mp3', image: 'images/img_hugs.png' },
        { word: 'Listen', sound: 'sounds/listen.mp3', image: 'images/img_listen.png' },
        { word: 'Help', sound: 'sounds/help.mp3', image: 'images/img_help.png' },
        { word: 'Love You', sound: 'sounds/loveyou.mp3', image: 'images/img_loveyou.png' },
    ]
  },
  {
    name: "Connections",
    words: [
        { word: 'Yes', sound: 'sounds/yes.mp3', image: 'images/img_yes.png' },
        { word: 'No', sound: 'sounds/no.mp3', image: 'images/img_no.png' },
        { word: 'Hm?', sound: 'sounds/hm.mp3', image: 'images/img_hm.png' },
        { word: "Where's", sound: 'sounds/where.mp3', image: 'images/img_where.png' },
        { word: 'why?', sound: 'sounds/why.mp3', image: 'images/img_why.png' },
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


