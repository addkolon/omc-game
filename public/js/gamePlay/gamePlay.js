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

const mainURL = "http://localhost:5500";

const livesEl = document.querySelector("#livesUl");
const savesEl = document.querySelector("#saves");

// general settings
export const boatSpeed = 5;

export const guysSpawnRate = 8;
export const guysSpeed = 5;

export const stonesSpawnRate = 3;
export const stonesSpeed = 5;

export const objectsSpeedWhenBoatGoinLeft = 3;
export const objectsSpeedWhenBoatGoinRight = 7;

export class GamePlay {
  constructor(lives, score, speed, tempSpeed, tempSpeedOn, frame) {
    this.lives = lives;
    this.score = score;
    this.speed = speed;
    this.tempSpeed = tempSpeed;
    this.tempSpeedOn = tempSpeedOn;
    this.frame = frame;
  }

  updateLives = async () => {
    this.lives -= 1;
    if (this.lives < 1) {
      let res = await fetch(mainURL + "/gameover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: this.score,
        }),
      }).then((res) => res.json());
      console.log(res);
      if (res.success) {
        location.href = mainURL + "/index.html";
      }
    } else {
      livesEl.innerHTML = "";
      for (let i = 0; i < this.lives; i++) {
        livesEl.innerHTML += "<li><img src='./sprite/life-ring.png'></li>";
      }
    }
    console.log(this.lives);
  };

  updateScore = () => {
    this.score += 50;
    savesEl.textContent = this.score;
  };

  updateSpeed = (amount, add) => {
    this.speed = add ? this.speed + amount : this.speed - amount;
  };

  updateTempSpeed = (reset, amount, add) => {
    if (reset) {
      this.tempSpeed = this.speed;
    }
    this.tempSpeed = add ? this.speed + amount : this.speed - amount;
  };

  updateFrame = () => {
    this.frame += 1;
  };
}

export const gamePlay = new GamePlay(10, 0, 5, 5, false, 1);
