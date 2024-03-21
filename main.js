// Letters
const letters = [...'abcdefghijklmnopqrstuvwxyz'];
// Selecting Elements
let lettersContainer = document.querySelector('.letters');
// generate letters
letters.forEach((letter) => {
  const span = document.createElement('span');
  span.classList.add('letter-box');
  span.textContent = letter;
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

let allKeys = Object.keys(words);
// Random Category
let randomProperty = allKeys[Math.floor(Math.random() * allKeys.length)];
// Random values
let randomValues = words[randomProperty];
// Random Word
let randomWord = randomValues[Math.floor(Math.random() * randomValues.length)];
// Set Category Name
let categoryName = document.querySelector('.category span');
categoryName.textContent = randomProperty;

// Select Letters Guess Element
let lettersEl = document.querySelector('.letters-guess');
let lettersAndSpace = Array.from(randomWord.toLowerCase());
// Create Word
lettersAndSpace.forEach((letter) => {
  const span = document.createElement('span');
  if (letter === ' ') {
    span.classList.add('space');
  }
  lettersEl.appendChild(span);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll('.letters-guess span');

// wrong Attempts
let mistakes = 0;

// Select Hangman
let hangmanDrawing = document.querySelector('.hangman-draw');

document.addEventListener('click', (e) => {
  let status = false;

  if (e.target.className === 'letter-box') {
    e.target.classList.add('clicked');
    let clickedLetter = e.target.innerHTML.toLowerCase(); // clicked letter

    lettersAndSpace.forEach((wordLetter, wordIndex) => {
      if (clickedLetter == wordLetter) {
        status = true;
        guessSpans[wordIndex].innerHTML = clickedLetter; // Or wordLetter
        // guessSpans.forEach((span, spanIndex) => {
        //   if (wordIndex == spanIndex) {
        //     span.innerHTML = clickedLetter
        //   }
        // })
      }
    });

    // Check If Word Is Complete And Create Popup
    let test = [...guessSpans].filter(span => span.innerHTML === '').length;
    if (test === 0) {
      endSucsessGame();
    }

    // Out Side Loop
    if (status !== true) {
      mistakes++;
      hangmanDrawing.classList.add(`wrong-${mistakes}`);
      if (mistakes === 8) {
        endGame();
        lettersContainer.classList.add('fail');
      }
    }
  }
});


// Create Popup Box At End Game
function endGame() {
  let div = document.createElement('div');
  div.className = 'popup-box';
  div.innerHTML = `Game Over You Made <span>${mistakes}</span> mistakes, the word is <span>${randomWord}</span>`;
  document.body.append(div);
}

function endSucsessGame() {
  let div = document.createElement('div');
  div.className = 'popup-box';
  div.innerHTML = `Congratulations You Made <span>${mistakes}</span> mistakes, the word is <span>${randomWord}</span>`;
  document.body.append(div);
}