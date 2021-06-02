"use strict";

// Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const dice = document.querySelector(".dice");
score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add("hidden");

//  Creating random number on click
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");
let currScore = 0;
const isActive = function (el) {
  return el.classList.contains("player--active");
};
const removeActive = function (el) {
  el.classList.remove("player--active");
};
const setActive = function (el) {
  el.classList.add("player--active");
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
const rollDice = function () {
  const diceValue = Math.floor(Math.random() * (7 - 1)) + 1;
  setCurrentScore(diceValue);
  setPicture(diceValue);
};

const btnRoll = document.querySelector(".btn--roll");
btnRoll.addEventListener("click", rollDice);
