/** @format */

import { handleGuys } from "./drowningGuys/drowningGuys.js";

import { gamePlay } from "./gamePlay/gamePlay.js";

import { checkBackground } from "./background/background.js";

import { drawSprite, boatSprite, boat, moveBoat } from "./boat/boat.js";

import { handleObstacles } from "./stones/stones.js";

import {
  handleCollisions,
  handleSavings,
  handleMissedGuy,
} from "./events/events.js";

export const canvas = document.querySelector(".canvas1");
export const ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 800;

let fps, fpsInterval, startTime, now, then, elapsed;

const startAnimating = (fps) => {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
};

const animate = () => {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSprite(
      boatSprite,
      boat.width * boat.frameX,
      boat.height * boat.frameY,
      boat.width,
      boat.height,
      boat.x,
      boat.y,
      boat.width,
      boat.height
    );

    checkBackground();

    moveBoat();

    if (handleMissedGuy()) {
      gamePlay.updateLives();
      console.log("hande missed guy");
    }

    if (handleCollisions()) {
      gamePlay.updateLives();
      console.log("hande collision");
    }

    if (handleSavings()) {
      gamePlay.updateScore();
    }

    handleObstacles();
    handleGuys();

    gamePlay.updateFrame();

    if (gamePlay.frame % 500 === 0) {
      gamePlay.updateSpeed(1, "add");
    }
  }
};

startAnimating(360);
