/** @format */

import { canvas, ctx } from "../index.js";

import { gamePlay } from "../gamePlay/gamePlay.js";

// hur ofta stenar spawnar
let stonesFrequency = 50;

const stone = new Image();
stone.src = "../sprite/Stones.png";
export const stoneArray = [];

class Stone {
  constructor(x, y, size, image) {
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - 125) + 125;
    this.size = Math.floor(Math.random() * 70) + 30;
    this.image = stone;
  }

  draw = () => {
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size / 1.5);
  };

  update = (tempSpeed) => {
    this.x = tempSpeed ? this.x - gamePlay.tempSpeed : this.x - gamePlay.speed;
    this.draw();
  };
}

export const handleObstacles = () => {
  if (gamePlay.frame % stonesFrequency === 0) {
    stoneArray.push(new Stone());
  }

  for (let i = 0; i < stoneArray.length; i++) {
    stoneArray[i].update(gamePlay.tempSpeedOn);
  }

  // if (stoneArray.length > 10) {
  //   stoneArray.pop(stoneArray[0]);
  // }
};
