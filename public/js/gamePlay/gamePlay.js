/** @format */

// /** @format */

// const livesEl = document.querySelector("h3");
// const savesEl = document.querySelector("h4");
// const gameSpeedEl = document.querySelector("h2");

// // general settings
// export const boatSpeed = 5;

// export const guysSpawnRate = 2;
// export const guysSpeed = 5;

// export const stonesSpawnRate = 2;
// export const stonesSpeed = 5;

// export const objectsSpeedWhenBoatGoinLeft = 3;
// export const objectsSpeedWhenBoatGoinRight = 8;

// export class GamePlay {
//   constructor(lives, score, speed, tempSpeed, tempSpeedOn, frame) {
//     this.lives = lives;
//     this.score = score;
//     this.speed = speed;
//     this.tempSpeed = tempSpeed;
//     this.tempSpeedOn = tempSpeedOn;
//     this.frame = frame;
//   }

//   updateLives = () => {
//     this.lives -= 1;
//     if (this.lives < 1) {
//       livesEl.textContent = "DÖD";
//     } else {
//       livesEl.textContent = "Liv: " + this.lives;
//     }
//   };

//   updateScore = () => {
//     this.score += 50;
//     savesEl.textContent = "Räddade: " + this.score;
//   };

//   updateSpeed = (amount, add) => {
//     this.speed = add ? this.speed + amount : this.speed - amount;
//     gameSpeedEl.textContent = "gamespeed: " + this.speed;
//   };

//   updateTempSpeed = (reset, amount, add) => {
//     if (reset) {
//       this.tempSpeed = this.speed;
//     }
//     this.tempSpeed = add ? this.speed + amount : this.speed - amount;
//     gameSpeedEl.textContent = "gamespeed: " + this.tempSpeed;
//   };

//   updateFrame = () => {
//     this.frame += 1;
//   };
// }

// export const gamePlay = new GamePlay(100, 0, 5, 5, false, 1);

/** @format */

const livesEl = document.querySelector("#lives");
const savesEl = document.querySelector("#saves");
const gameSpeedEl = document.querySelector("#game-speed");

// general settings
export const boatSpeed = 5;

export const guysSpawnRate = 8;
export const guysSpeed = 5;

export const stonesSpawnRate = 4;
export const stonesSpeed = 5;

export const objectsSpeedWhenBoatGoinLeft = 2;
export const objectsSpeedWhenBoatGoinRight = 3;

export class GamePlay {
  constructor(lives, score, speed, tempSpeed, tempSpeedOn, frame) {
    this.lives = lives;
    this.score = score;
    this.speed = speed;
    this.tempSpeed = tempSpeed;
    this.tempSpeedOn = tempSpeedOn;
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
    this.score += 50;
    savesEl.textContent = this.score;
  };

  updateSpeed = (amount, add) => {
    this.speed = add ? this.speed + amount : this.speed - amount;
    // gameSpeedEl.textContent = "gamespeed: " + this.speed;
  };

  updateTempSpeed = (reset, amount, add) => {
    if (reset) {
      this.tempSpeed = this.speed;
    }
    this.tempSpeed = add ? this.speed + amount : this.speed - amount;
    // gameSpeedEl.textContent = "gamespeed: " + this.tempSpeed;
  };

  updateFrame = () => {
    this.frame += 1;
  };
}

export const gamePlay = new GamePlay(100, 0, 5, 5, false, 1);
