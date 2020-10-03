import { Application } from "pixi.js";
import Person from "./person";
import { Player } from './player';

interface IGlobals {
  app: Application;
  crowd: Person[];
  player: Player;
}

export const WALKING_SPEED = 3;
export const RUNNING_SPEED = 8;

export const Globals: IGlobals = {
  app: null,
  crowd: [],
  player: null
}
