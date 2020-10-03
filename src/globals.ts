import { Application } from "pixi.js";
import Person from "./person";
import { Player } from './player';

interface IGlobals {
  app: Application;
  crowd: Person[];
  player: Player;
}

export const WALKING_SPEED = 5;
export const RUNNING_SPEED = 10;

export const Globals: IGlobals = {
  app: null,
  crowd: [],
  player: null
}
