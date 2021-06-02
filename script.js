"use strict";

// Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const dice = document.querySelector(".dice");
score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add("hidden");

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

//Roll-dice button functionality
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");
let currScore = 0;

const isActive = function (el) {
  return el.classList.contains("player--active");
};
const removeActive = function (el) {
  el.classList.contains("player--active")
    ? el.classList.remove("player--active")
    : el;
};
const setActive = function (el) {
  !el.classList.contains("player--active")
    ? el.classList.add("player--active")
    : el;
};
const setCurrentScore = function (value) {
  if (value === 1) {
    currScore = 0;
    if (isActive(player0)) {
      removeActive(player0);
      setActive(player1);
      current0.textContent = 0;
    } else {
      setActive(player0);
      removeActive(player1);
      current1.textContent = 0;
    }
  } else {
    currScore += value;
    isActive(player0)
      ? (current0.textContent = currScore)
      : (current1.textContent = currScore);
  }
};
const setPicture = function (value) {
  dice.classList.remove("hidden");
  dice.src = `dice-${value}.png`;
};
const changeNameColor = function (id) {
  document.querySelector(id).classList.add("player--winner");
};

const rollDice = function () {
  const diceValue = Math.floor(Math.random() * (7 - 1)) + 1;
  setCurrentScore(diceValue);
  setPicture(diceValue);
};

const btnRoll = document.querySelector(".btn--roll");
btnRoll.addEventListener("click", rollDice);

// Hold button functionality
const holdBtn = document.querySelector(".btn--hold");
let score0 = 0;
let score1 = 0;
const scoreHandler = function () {
  if (isActive(player0)) {
    score0 += currScore;
    score0El.textContent = score0;
    if (score0 >= 100) {
      player0.classList.add("player--winner");
      changeNameColor("#name--0");
      btnRoll.removeEventListener("click", rollDice);
      holdBtn.removeEventListener("click", scoreHandler);
    } else {
      currScore = 0;
      current0.textContent = 0;
      removeActive(player0);
      setActive(player1);
    }
  } else {
    score1 += currScore;
    score1El.textContent = score1;
    if (score1 >= 100) {
      player1.classList.add("player--winner");
      changeNameColor("#name--1");
      btnRoll.removeEventListener("click", rollDice);
      holdBtn.removeEventListener("click", scoreHandler);
    } else {
      currScore = 0;
      current1.textContent = 0;
      removeActive(player1);
      setActive(player0);
    }
  }
};
holdBtn.addEventListener("click", scoreHandler);

// 'New game' button functionality

const newBtn = document.querySelector(".btn--new");
const resetWinnerStyles = function (id, el) {
  document.querySelector(id).classList.contains("player--winner")
    ? document.querySelector(id).classList.remove("player--winner")
    : el;
  el.classList.contains("player--winner")
    ? el.classList.remove("player--winner")
    : el;
};
const resetGame = function () {
  currScore = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  score0 = 0;
  score1 = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  dice.classList.add("hidden");
  resetWinnerStyles("#name--1", player1);
  resetWinnerStyles("#name--0", player0);
  removeActive(player1);
  setActive(player0);
  btnRoll.addEventListener("click", rollDice);
  holdBtn.addEventListener("click", scoreHandler);
};
newBtn.addEventListener("click", resetGame);
