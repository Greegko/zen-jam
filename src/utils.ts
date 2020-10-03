import { Sprite } from "pixi.js";

export function hitTestRectangle(r1: Sprite, r2: Sprite) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Calculate the distance vector between the sprites
  vx = (r1.x + r1.width / 2) - (r2.x + r2.width / 2);
  vy = (r1.y + r1.height / 2) - (r2.y + r2.height / 2);

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.width / 2 + r2.width / 2;
  combinedHalfHeights = r1.height / 2 + r2.height / 2;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};
