"use strict";

// Selecting elements

const dice = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const newBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0").classList;
const player1El = document.querySelector(".player--1").classList;
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
// Starting conditions
let currScore, activePlayer, playing, scores;

startNewGame();
// switch active player
function switchPlayer() {
  currScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.toggle("player--active");
  player1El.toggle("player--active");
}
// calculate current score
function setCurrentScore(value) {
  if (value === 1) {
    switchPlayer();
  } else {
    currScore += value;
    document.querySelector(`#current--${activePlayer}`).textContent = currScore;
  }
}
// set the correct dice picture according to the random value
function setPicture(value) {
  dice.classList.remove("hidden");
  dice.src = `dice-${value}.png`;
}

//Roll-dice button functionality
function rollDice() {
  if (playing) {
    const diceValue = Math.floor(Math.random() * (7 - 1)) + 1;
    setCurrentScore(diceValue);
    setPicture(diceValue);
  }
}

// Hold button functionality
function scoreHandler() {
  if (playing) {
    scores[activePlayer] += currScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    scores[activePlayer] >= 100 ? winTheGame() : switchPlayer();
  }
}

// set styles for the winner
function winTheGame() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  playing = false;
  dice.classList.add("hidden");
}

//reset the game
function startNewGame() {
  currScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];

  score0El.textContent = 0;
  score1El.textContent = 0;
  document.querySelector("#current--0").textContent = 0;
  document.querySelector("#current--1").textContent = 0;

  dice.classList.add("hidden");
  player0El.remove("player--winner");
  player1El.remove("player--winner");
  player1El.remove("player--active");
  player0El.add("player--active");
}

btnRoll.addEventListener("click", rollDice);
holdBtn.addEventListener("click", scoreHandler);
newBtn.addEventListener("click", startNewGame);
