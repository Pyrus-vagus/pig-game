"use strict";

// Starting conditions
let currScore = 0;
let activePlayer = 0;
const scores = [0, 0];

// Selecting elements

const dice = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const newBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");

resetTheGame();

// remove active-player status
function removeActive() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
}
// set active-player status
function setActive() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
}
// switch active player
function switchPlayer() {
  removeActive();
  currScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  setActive();
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
  const diceValue = Math.floor(Math.random() * (7 - 1)) + 1;
  setCurrentScore(diceValue);
  setPicture(diceValue);
}

// Hold button functionality
function scoreHandler() {
  scores[activePlayer] += currScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
  scores[activePlayer] >= 100 ? winTheGame() : switchPlayer();
}

// set styles for the winner
function winTheGame() {
  const winner = document.querySelector(`.player--${activePlayer}`).classList;
  const winnerName = document.querySelector(`#name--${activePlayer}`).classList;
  winner.add("player--winner");
  winnerName.add("player--winner");
  btnRoll.removeEventListener("click", rollDice);
  holdBtn.removeEventListener("click", scoreHandler);
}

//reset the game
function resetTheGame() {
  const winner = document.querySelector(`.player--${activePlayer}`).classList;
  const winnerName = document.querySelector(`#name--${activePlayer}`).classList;
  winner.contains("player--winner") ? winner.remove("player--winner") : winner;
  winnerName.contains("player--winner")
    ? winnerName.remove("player--winner")
    : winnerName;
  document.querySelector("#current--0").textContent = 0;
  document.querySelector("#current--1").textContent = 0;
  activePlayer = 1;
  switchPlayer();
  scores[0] = 0;
  scores[1] = 0;
  dice.classList.add("hidden");
  document.querySelector("#score--0").textContent = 0;
  document.querySelector("#score--1").textContent = 0;
  btnRoll.addEventListener("click", rollDice);
  holdBtn.addEventListener("click", scoreHandler);
}

newBtn.addEventListener("click", resetTheGame);
