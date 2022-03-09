/** @format */

import { stoneArray } from "../stones/stones.js";
import { guyArray } from "../drowningGuys/drowningGuys.js";

import { boat } from "../boat/boat.js";

export const handleCollisions = () => {
  for (let i = 0; i < stoneArray.length; i++) {
    let boatWidth = boat.frameY === 0 || boat.frameY === 2 ? boat.width : 125;
    if (
      boat.x < stoneArray[i].x + stoneArray[i].size &&
      boat.x + boatWidth > stoneArray[i].x &&
      boat.y < stoneArray[i].y + stoneArray[i].size &&
      boat.y + boat.height > stoneArray[i].y
    ) {
      stoneArray[i].y = 1000;
      return true;
    }
  }
};

export const handleSavings = () => {
  for (let i = 0; i < guyArray.length; i++) {
    // if (
    //   boat.x < guyArray[i].x + guyArray[i].width &&
    //   boat.x + boat.width > guyArray[i].x &&
    //   boat.y < guyArray[i].y + guyArray[i].height &&
    //   boat.y + boat.height > guyArray[i].y
    // )

    let boatWidth = boat.frameY === 0 || boat.frameY === 2 ? boat.width : 125;
    if (
      guyArray[i].y < 999 &&
      boat.x < guyArray[i].x + guyArray[i].width &&
      boat.x + boatWidth > guyArray[i].x &&
      boat.y < guyArray[i].y + guyArray[i].height &&
      boat.y + boat.height > guyArray[i].y
    ) {
      guyArray[i].y = 1000;
      guyArray[i].saved = true;
      return true;
    }
  }
};

export const handleMissedGuy = () => {
  for (let i = 0; i < guyArray.length; i++) {
    // console.log(guyArray[i].x < -187);
    if (guyArray[i].x < -187 && !guyArray[i].saved && guyArray[i].y < 999) {
      guyArray[i].saved = true;
      // console.log("missed");
      return true;
    }
  }
};
// export const handleMissedGuy = () => {
//   for (let i = 0; i < guyArray.length; i++) {
//     if (guyArray[i].x < -187) {
//       guyArray.splice(guyArray[i], 1);
//       i--;
//       return true;
//     }
//   }
// };
