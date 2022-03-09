/** @format */

import { canvas, ctx } from "../index.js";

import {
  gamePlay,
  stonesSpawnRate,
  stonesSpeed,
} from "../gamePlay/gamePlay.js";
import { guyArray } from "../drowningGuys/drowningGuys.js";

const stone = new Image();
stone.src = "../sprite/Stones.png";
export const stoneArray = [];

class Stone {
  constructor(x, y, size, image) {
    this.x = x;
    // this.y = Math.random() * (canvas.height - 125) + 125;
    // this.size = Math.floor(Math.random() * 70) + 30;
    this.y = y;
    this.size = size;
    this.image = image;
  }

  draw = () => {
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size / 1.5);
  };

  update = (tempSpeed) => {
    this.x = tempSpeed
      ? this.x - gamePlay.tempSpeed - (stonesSpeed - 5)
      : this.x - gamePlay.speed - (stonesSpeed - 5);
    this.draw();
  };
}

export const handleObstacles = () => {
  if (gamePlay.frame % (stonesSpawnRate * 10) === 0) {
    let y = Math.random() * (canvas.height - 125 - 50) + 125;
    let x = canvas.width;
    let size = Math.floor(Math.random() * 70) + 30;

    while (
      guyArray.filter((s) => {
        return (
          x < s.x + s.width &&
          x + size > s.x &&
          y < s.y + s.height &&
          y + size > s.y
        );
      }).length > 0
    ) {
      y = Math.random() * (canvas.height - 50) + 125;
    }
    stoneArray.push(new Stone(x, y, size, stone));
  }

  for (let i = 0; i < stoneArray.length; i++) {
    stoneArray[i].update(gamePlay.tempSpeedOn);
  }
  if (stoneArray.length > 100) {
    stoneArray.pop(0);
  }
};
