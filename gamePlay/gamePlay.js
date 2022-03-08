/** @format */

const livesEl = document.querySelector("h3");
const savesEl = document.querySelector("h4");
const gameSpeedEl = document.querySelector("h2");

export class GamePlay {
  constructor(lives, score, speed, frame) {
    this.lives = lives;
    this.score = score;
    this.speed = speed;
    this.frame = frame;
  }

  updateLives = () => {
    this.lives -= 1;
    if (this.lives < 1) {
      livesEl.textContent = "DÖD";
    } else {
      livesEl.textContent = "Liv: " + this.lives;
    }
  };

  updateScore = () => {
    this.score += 1;
    savesEl.textContent = "Räddade: " + this.score;
  };

  updateSpeed = (amount, add) => {
    this.speed = add ? this.speed + amount : this.speed - amount;
    gameSpeedEl.textContent = "gamespeed: " + this.speed;
  };

  updateFrame = () => {
    this.frame += 1;
  };
}

export const gamePlay = new GamePlay(100, 0, 5, 1);
