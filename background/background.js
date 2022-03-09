/** @format */

import { boat } from "../boat/boat.js";
import { ctx } from "../index.js";

// BACKGROUND - Mattias
export const bg1 = new Image();
bg1.src = "../sprite/bg1.png";
export const bg2 = new Image();
bg2.src = "../sprite/bg2.png";
export const bg3 = new Image();
bg3.src = "../sprite/bg3.png";
export const bg4 = new Image();
bg4.src = "../sprite/bg4.png";

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 125;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = 10 * this.speedModifier;
    this.tempSpeed = 10 * this.speedModifier;
  }
  update() {
    this.speed = 10 * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = this.x - this.speed;
    this.x2 = this.x2 - this.speed;
  }

  update2(faster) {
    this.tempSpeed = faster ? 20 * this.speedModifier : 4 * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.tempSpeed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.tempSpeed;
    }
    this.x = this.x - this.tempSpeed;
    this.x2 = this.x2 - this.tempSpeed;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y2, this.width, this.height);
  }
}

const layer1 = new Layer(bg4, 0);
const layer2 = new Layer(bg3, 0.06);
const layer3 = new Layer(bg2, 0.08);
const layer4 = new Layer(bg1, 0.1);

export const gameBg = [layer1, layer2, layer3, layer4];

export const checkBackground = () => {
  gameBg.forEach((object, i) => {
    if (
      object.x < -1199 &&
      gameBg.filter((o) => o.image === object.image).length < 3 &&
      object.image !== bg4
    ) {
      let newLayer = new Layer(object.image, object.speedModifier);
      newLayer.x = 1200;
      gameBg.push(newLayer);
    }
    if (object.x < -2400) {
      gameBg.pop(gameBg[i]);
      console.log(gameBg);
    }
    if (!boat.moving) {
      object.speed = 0;
    } else {
      object.speed = 10 * object.speedModifier;
      object.update();
    }
    object.draw();
  });
};
