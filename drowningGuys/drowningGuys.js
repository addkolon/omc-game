/** @format */

import {  canvas, ctx } from "../index.js";

import { gamePlay } from "../gamePlay/gamePlay.js";

const guy = new Image();
guy.src = "./sprite/drowningGuy.png";
export const guyArray = [];

export class DrowningGuy {
  constructor(x, y, width, height, image) {
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - 125 - 134) + 125;
    this.width = 187;
    this.height = 134;
    this.image = guy;
  }

  draw = () => {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  update = () => {
    this.x -= gamePlay.speed;
    this.draw();
  };
}

export const handleGuys = () => {
  if (gamePlay.frame % 150 === 0) {
    guyArray.unshift(new DrowningGuy());
  }

  for (let i = 0; i < guyArray.length; i++) {
    guyArray[i].update();
  }
};


