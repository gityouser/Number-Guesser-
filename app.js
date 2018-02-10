// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', (e) => {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
})


// Listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);
  //Validate input
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
  }
  //Check if won
  if(guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!`)
  } else {
    //Wrong Number
    guessesLeft -= 1;
    if(guessesLeft === 0) {
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`, 'red')
    } else {
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      setMessage(`${guess} is not correct, ${guessesLeft}  guesses left.`, 'red')
    }
  }
})

//Game over
function gameOver(won, msg) {
  let color;
  won === true? color = 'green' : color = 'red';

  //Disable input
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  message.style.color = color;

  // Set message
  setMessage(msg);

  //Play Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';

}

// Get Winning Number
function getRandomNumber(min, max) {
  return (Math.floor(Math.random()*(max-min)+min));
}

//Set message
function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}
