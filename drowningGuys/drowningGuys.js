/** @format */

import { canvas, ctx } from "../index.js";

import { gamePlay, guysSpawnRate, guysSpeed } from "../gamePlay/gamePlay.js";
import { stoneArray } from "../stones/stones.js";

// hur ofta guys spawnar

const guy = new Image();
guy.src = "../sprite/Person.png";
export const guyArray = [];

export class DrowningGuy {
  constructor(x, y, width, height, image) {
    // this.x = canvas.width;
    // this.y = Math.random() * (canvas.height - 125 - 134) + 125;
    // this.width = 60;
    // this.height = 51;
    // this.image = guy;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }

  draw = () => {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  update = (tempSpeed) => {
    this.x = tempSpeed
      ? this.x - gamePlay.tempSpeed - (guysSpeed - 5)
      : this.x - gamePlay.speed - (guysSpeed - 5);
    this.draw();
  };
}

export const handleGuys = () => {
  if (gamePlay.frame % (guysSpawnRate * 10) === 0) {
    // let y = Math.random() * (canvas.height - 125 - 134) + 125;
    let y = Math.random() * (canvas.height - 125 - 100) + 125;
    let x = canvas.width;
    let width = 60;
    let height = 51;

    while (
      stoneArray.filter((s) => {
        return (
          x < s.x + s.size &&
          x + width > s.x &&
          y < s.y + s.size &&
          y + height > s.y
        );
      }).length > 0
    ) {
      y = Math.random() * (canvas.height - 125 - 100) + 125;
    }

    guyArray.unshift(new DrowningGuy(x, y, width, height, guy));
  }

  for (let i = 0; i < guyArray.length; i++) {
    guyArray[i].update(gamePlay.tempSpeedOn);
  }
};
