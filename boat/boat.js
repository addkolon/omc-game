/** @format */

import { canvas, ctx } from "../index.js";

import {
  boatSpeed,
  gamePlay,
  objectsSpeedWhenBoatGoinLeft,
  objectsSpeedWhenBoatGoinRight,
} from "../gamePlay/gamePlay.js";
import { gameBg } from "../background/background.js";

const boatImage = new Image();
boatImage.src = "../sprite/boat-3.png";

export class Boat {
  constructor(image, x, y, width, height, frameX, frameY, speed, moving) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.frameX = frameX;
    this.frameY = frameY;
    this.speed = speed;
    this.moving = moving;
  }

  draw = (image, x, y, width, height, frameX, frameY, dW, dH) => {
    ctx.drawImage(image, x, y, width, height, frameX, frameY, dW, dH);
  };

  update = () => {
    this.x -= gamePlay.speed;
    this.draw();
  };
}

// boat coming in from side

export const handleBoatFrame = () => {
  console.log(boat.frameX);
  if (boat.frameX < 2 && boat.moving) {
    console.log("innnnnne");
    boat.frameX += 1;
  } else {
    boat.frameX = 0;
  }
};

const keys = [];
export const moveBoat = () => {
  if (keys["ArrowUp"] && boat.y > 125) {
    boat.y -= boat.speed;
    boat.frameY = 3;
    boat.moving = true;
    gameBg.forEach((b) => {
      b.update();
    });
  }
  if (keys["ArrowDown"] && boat.y < canvas.height - boat.height) {
    boat.y += boat.speed;
    boat.frameY = 1;
    boat.moving = true;

    gameBg.forEach((b) => {
      b.update();
    });
  }
  if (keys["ArrowLeft"] && boat.x > 0) {
    boat.x -= boat.speed;
    boat.frameY = 2;
    boat.moving = true;

    if (!gamePlay.tempSpeedOn) {
      gamePlay.updateTempSpeed(false, objectsSpeedWhenBoatGoinLeft, false);
      gamePlay.tempSpeedOn = true;
    }

    gameBg.forEach((b) => {
      b.update2(false);
    });
  }
  if (keys["ArrowRight"] && boat.x < canvas.width - boat.width) {
    boat.x += boat.speed;
    boat.frameY = 0;
    boat.moving = true;

    if (!gamePlay.tempSpeedOn) {
      gamePlay.updateTempSpeed(false, objectsSpeedWhenBoatGoinRight, true);
      gamePlay.tempSpeedOn = true;
    }

    gameBg.forEach((b) => {
      b.update2(true);
    });
  }

  // speedboost? :P
  if (keys["s"]) {
    console.log("speeeed");
    boat.speed += 3;
    setTimeout(() => {
      boat.speed = 1;
    }, 5000);
  }
};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  delete keys[e.key];
  if (gamePlay.tempSpeedOn) {
    gamePlay.updateTempSpeed(true, 0, true);
    gamePlay.tempSpeedOn = false;
  }
  boat.moving = false;
});

export const boat = new Boat(
  boatImage,
  200,
  200,
  176,
  74,
  0,
  0,
  boatSpeed,
  false
);
