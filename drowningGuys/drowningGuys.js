/** @format */

import {  canvas, ctx } from "../index.js";

import { gamePlay } from "../gamePlay/gamePlay.js";

// hur ofta guys spawnar
let guysFrequency = 80;

const guy = new Image();
guy.src = "../sprite/Person.png";
export const guyArray = [];

export class DrowningGuy {
  constructor(x, y, width, height, image) {
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - 125 - 134) + 125;
    this.width = 60;
    this.height = 51;
    this.image = guy;
  }

  draw = () => {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  update = (tempSpeed) => {
    this.x = tempSpeed ? this.x - gamePlay.tempSpeed - 1 : this.x - gamePlay.speed - 1;
    this.draw();
  };
}

export const handleGuys = () => {
  if (gamePlay.frame % guysFrequency === 0) {
    
    guyArray.unshift(new DrowningGuy());
  }

  for (let i = 0; i < guyArray.length; i++) {
    guyArray[i].update(gamePlay.tempSpeedOn);
  }
};


