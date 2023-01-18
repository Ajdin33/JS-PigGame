'use strict';

// Selecting elements
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnAgain = document.querySelector('.btn--new');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Setting values
let playing, currentPlayer, currentScore, highscore;

// functions
const playerSwitch = function () {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;

  // swithcing backgrounds to current player
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const load = function () {
  playing = true;
  currentPlayer = 0;
  currentScore = 0;
  highscore = [0, 0];

  score0.textContent = 0;
  score1.textContent = 0;

  diceEl.classList.add('hidden');
  current0.textContent = 0;
  current1.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
load();

// button for roll
btnRoll.addEventListener('click', () => {
  // if we are done with game and playing is false nothing will get executed
  if (playing) {
    let dice = Math.trunc(Math.random() * 6 + 1);

    // displaying dice on website
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // getting score if dice isn't 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
      // if it is we switch to next player
    } else {
      playerSwitch();
    }
  }
});

// button for hold - pass to next player
btnHold.addEventListener('click', () => {
  if (playing) {
    // storing current scores to highscore
    highscore[currentPlayer] += currentScore; // storing in JS
    document.getElementById(`score--${currentPlayer}`).textContent =
      highscore[currentPlayer]; // storing in website

    // if player win the game
    if (highscore[currentPlayer] > 100) {
      diceEl.classList.add('hidden');
      playing = false;

      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');

      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
    } else {
      playerSwitch();
    }
  }
});

// button for starting game again
btnAgain.addEventListener('click', load);

// const test = document.querySelector('.test');

// test.addEventListener('click', () => {
//   console.log(highscore[0]);
//   console.log(highscore[1]);
// });
