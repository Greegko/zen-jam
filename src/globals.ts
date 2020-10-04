import { Application } from "pixi.js";
import Person from "./person";
import { Player } from './player';

interface IGlobals {
  app: Application;
  crowd: Person[];
  player: Player;
  triggerLimbo: Function;
}

export const WALKING_SPEED = 3;
export const RUNNING_SPEED = 6;

export const Globals: IGlobals = {
  app: null,
  crowd: [],
  player: null,
  triggerLimbo: null
}
