var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]


// set up var, set to zero 
var previousWord = '';
var remainingGuessesLeft = 10;
var incorrectLettersGuess = [];
var correctLetters = [];
var wins = 0;
var losses = 0;
var answer = false;
// set html elements
var wordToGuessEl = document.getElementById('word-to-guess');
wordToGuessEl.textContent = '';
var previousWordEl = document.getElementById('previous-word');
var incorrectLettersEl = document.getElementById('incorrect-letters');
var remainingGuessesEl = document.getElementById('remaining-guesses');

remainingGuessesEl.textContent = remainingGuessesLeft;

//set elements for wins and losses
var winsEl = document.getElementById('wins');
var lossesEl = document.getElementById('losses');

// choose a random word and set it to var
var correctWord = words[Math.floor(Math.random() * words.length)];

// use for loop for correctWord, set up underscores
var solved = correctWord.split('');
for (var i = 0; i < correctWord.length; i++) {
  solved[i] = '_';
}

// display correct letter in guessed word to replace underscore
var displayWord = solved.join('');
wordToGuessEl.textContent = displayWord;

// keypress access and update game for correct/incorrect guess
document.body.onkeyup = function (e) {
  var key = e.key.toLowerCase();
//check for player's correct/incorrect guess, update wins/losses
  if (
    incorrectLettersGuess.includes(key) == false &&
    correctLetters.includes(key) == false
  ) {
    for (var i = 0; i < correctWord.length; i++) {
      if (correctWord[i] == key) {
        answer = true;
        correctLetters.push(key);
        solved[i] = key;
      }
    }
    //begin game
    if (answer == true) { // if guess is correct
      displayWord = solved.join('');
      wordToGuessEl.textContent = displayWord; //update display

      if (wordToGuessEl.textContent === correctWord) { //if guess equals the correct word
        wins++;
        winsEl.textContent = wins; //wins go up
        previousWordEl.textContent = correctWord; //display
        //reset
        correctWord = words[Math.floor(Math.random() * words.length)];
        solved = correctWord.split('');

        for (var a = 0; a < correctWord.length; a++) {
          solved[a] = '_'; //update underscores
        }

        remainingGuessesLeft = 10;
        displayWord = solved.join('');

        correctLetters = [];
        incorrectLettersGuess = [];
        incorrectLettersEl.textContent = '';
        remainingGuessesEl.textContent = remainingGuessesLeft;
        wordToGuessEl.textContent = displayWord;
      }
    } else { // if guess is incorrect
      incorrectLettersGuess.push(key); //sort into incorrect array
      remainingGuessesLeft--;//update guesses left
      remainingGuessesEl.textContent = remainingGuessesLeft; //display
      incorrectLettersEl.textContent = incorrectLettersGuess.join(' ');
    }

    if (remainingGuessesLeft == 0) { //if no guesses are left
      losses++; //player loses
      lossesEl.textContent = losses;
      previousWordEl.textContent = correctWord;
      //start new game
      correctWord = words[Math.floor(Math.random() * words.length)];
      solved = correctWord.split('');

      for (var b = 0; b < correctWord.length; b++) {
        solved[b] = '_';
      }
      //reset game state entirely
      remainingGuessesLeft = 10;
      displayWord = solved.join('');
      correctLetters = [];
      incorrectLettersGuess = [];
      incorrectLettersEl.textContent = '';
      remainingGuessesEl.textContent = remainingGuessesLeft;
      wordToGuessEl.textContent = displayWord;
    }
  }
//reset
  answer = false;
};