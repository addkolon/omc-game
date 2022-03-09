/** @format */

function togglePlay() {
  var myAudio = document.getElementById("myAudio");
  return myAudio.paused ? myAudio.play() : myAudio.pause();
};


import { handleGuys } from "./drowningGuys/drowningGuys.js";

import { gamePlay } from "./gamePlay/gamePlay.js";

import { checkBackground } from "./background/background.js";

import { boat, handleBoatFrame, moveBoat } from "./boat/boat.js";

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
let canvasPosition = canvas.getBoundingClientRect();
console.log(canvasPosition);

const explosions = [];

class Explosion {
  constructor(x,y) {
    this.spriteWidth = 39;
    this.spriteHeight = 41;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.x = x - this.width/2;
    this.y = y - this.height/2;
    this.image = new Image();
    this.image.src = "../sprite/Boom.png";
    this.frame = 0;
    this.timer = 0;
    this.sound = new Audio;
    this.sound.scr = "boom.wav";
  }
  update() {
    if (this.frame === 0 ) this.sound.play();
    this.timer++;
    if (this.timer % 10 === 0){
      this.frame++
    }
  }
  draw() {
    ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}


window.addEventListener('click', function(e){
  createExplosion(e);
});

function createExplosion(e) {
  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;
  explosions.push(new Explosion(positionX, positionY)); 
  console.log(explosions);
}



function animateExplosion() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explosions.length; i++){
    explosions[i].update();
    explosions[i].draw(); 
    if (explosions[i].frame > 5){
      explosions.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animateExplosion);
} 

animateExplosion();

let fps, fpsInterval, startTime, now, then, elapsed;

// const startAnimating = (fps) => {
//   fpsInterval = 1000 / fps;
//   then = Date.now();
//   startTime = then;
//   animate();
// };

// const animate = () => {
//   requestAnimationFrame(animate);
//   now = Date.now();
//   elapsed = now - then;
//   if (elapsed > fpsInterval) {
//     then = now - (elapsed % fpsInterval);
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     console.log(boat.width * boat.frameX);
//     boat.draw(
//       boat.image,
//       boat.width * boat.frameX,
//       boat.height * boat.frameY,
//       boat.width,
//       boat.height,
//       boat.x,
//       boat.y,
//       boat.width,
//       boat.height
//     );

//     checkBackground();

//     if (handleMissedGuy()) {
//       gamePlay.updateLives();
//     }

//     if (handleCollisions()) {
//       gamePlay.updateLives();
//     }

//     if (handleSavings()) {
//       gamePlay.updateScore();
//     }

//     handleObstacles();
//     handleGuys();

//     moveBoat();

//     gamePlay.updateFrame();

//     if (gamePlay.frame % 10 === 0) {
//       handleBoatFrame();
//     }

//     // if (gamePlay.frame % 500 === 0) {
//     //   gamePlay.updateSpeed(1, "add");
//     // }
//   }
// };

//startAnimating(100);
