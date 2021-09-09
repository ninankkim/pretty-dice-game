'use strict';

//COMMENT
//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//COMMENT
//starting conditions - this shows us what the game will look like when the game starts or refreshes

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();


const switchPlayer = function () {
    // switch to next place - so this code will run when the active players dice IS 1
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    // the new active player will start off with a current score of 0
    currentScore = 0;
    // if the active player is 0, then we want the new active player to be 1, otherwise its 0
    // we are reassigning the active player by checking
    // essentially this code down here checks who the active player is using a ternerary operator
    activePlayer = activePlayer === 0 ? 1 : 0;

    // this will toggle between the active player, if they are playing the backgroun-color goes lighter
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generate a random dice Roll
        const dice = Math.trunc(Math.random() * 6 + 1);

        // 2. Display the dice
        // the .remove will remove the hidden feature on the dice, showing the dice
        diceEl.classList.remove('hidden');
        // this will show the picture of the dice that is contingent on the number
        diceEl.src = `dice-${dice}.png`;

        // 3. Check for rolled 1
        // if the dice is NOT equal to 1, then we will add that dice to the score
        // so if you roll a 6, the score will be 6 - if you roll another and it's 7, score will be 13
        if (dice !== 1) {
            // add dice to current score
            currentScore = currentScore + dice; // or currentScore += dice; (same thing)
            // this code below will then continously display the score as they are playing of the the active player
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore; // scores[1] = scores[1] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // If so, then finish the game
            playing = false;
            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Not, then switch player
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', init);