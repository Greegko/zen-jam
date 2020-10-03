import Person from "./person";
import { Player } from './player';

interface IGlobals {
  app: PIXI.Application;
  crowd: Person[];
  player?: Player;
}

export const WALKING_SPEED = 5;
export const RUNNING_SPEED = 10;

export const Globals: IGlobals = {
  app: null,
  crowd: []
}
