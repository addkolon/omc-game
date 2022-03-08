/** @format */

import { canvas, ctx } from "../index.js";

import { gamePlay } from "../gamePlay/gamePlay.js";

const stone = new Image();
stone.src = "./sprite/Stones.png";
export const stoneArray = [];

class Stone {
  constructor(x, y, size, image) {
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - 125) + 125;
    this.size = Math.floor(Math.random() * 70) + 30;
    this.image = stone;
  }

  draw = () => {
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
  };

  update = () => {
    this.x -= gamePlay.speed;
    this.draw();
  };
}

export const handleObstacles = () => {
  if (gamePlay.frame % 200 === 0) {
    stoneArray.unshift(new Stone());
  }

  for (let i = 0; i < stoneArray.length; i++) {
    stoneArray[i].update();
  }

  if (stoneArray.length > 10) {
    stoneArray.pop(stoneArray[0]);
  }
};

// collision ***********
