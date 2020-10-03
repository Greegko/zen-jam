import Person from "./person";
import { Player } from './player';

interface IGlobals {
  app: PIXI.Application;
  crowd: Person[];
  player?: Player;
}

export const SPEED = 10;

export const Globals: IGlobals = {
  app: null,
  crowd: []
}
