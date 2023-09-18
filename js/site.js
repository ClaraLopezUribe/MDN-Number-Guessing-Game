// This is the logic to generate a random number between 1-100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Declares a contant identifying the p elements in which to display the text in the checkGuess function
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

// Declares a constant identifying the text input field and Submit Guess button
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;
guessField.focus();


//This function retrieves the number entered by the user from the text field and applies several conditional tests to determine the flow of actions
function checkGuess() {
    
    //Displays initial text in .guesses paragraph on users first guess
    const userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
    }
    //Combines (concatenates) each guess user enters to the initial text above
    guesses.textContent += `${userGuess} `;
    
    //Defines and displays the messages and background colors based on the user input. If the user wins or runs out of turns, a function is triggered (or called) to prevent user from entering more guesses and which displays a button to Start New Game.
    if (userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver (); 
    } else if (guessCount === 10) {
    lastResult.textContent = '!!!GAME OVER!!!';
    lowOrHi.textContent = '';
    setGameOver ();
    } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if (userGuess < randomNumber) {
        lowOrHi.textContent = 'Last guess was too low!';
    } else if (userGuess > randomNumber) {
        lowOrHi.textContent = 'Last guess was too high!';
    }
    }

    //Increases (or increments) the guestCount by one, clears the text field of previous entry, and resets focus on the text field
    guessCount++;
    guessField.value = ''
    guessField.focus();
}

//Listens for the user to click the Submit Guess button, then runs the checkGuess function
guessSubmit.addEventListener('click', checkGuess);

//When this function is called, the text field and Submit Guess button are disabled, preventing the user from inputing more numbers after the game is over. It also creates a new button allowing users to Start New Game when clicked
function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start New Game';
    document.body.append(resetButton);
    resetButton.addEventListener('click', resetGame)
}

//When called, this function resets the game to its original state
function resetGame() {

    guessCount = 1;

    //Selects all p elements and loops through each one to clear their content (set as empty string)
    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
    }

    //Removes 'Start New Game' button created in the setGameOver function
    resetButton.parentNode.removeChild(resetButton);

    //Clears, enables, and focuses the text field. Enables Submit Guess button.
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    //generates a new random number for next game
    randomNumber = Math.floor(Math.random () * 100) + 1;
}