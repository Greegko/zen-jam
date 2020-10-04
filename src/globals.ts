import { Application, Container } from "pixi.js";
import Person from "./person";
import {SpawnManager} from "./spawnManager";
import { Player } from './player';
import { SoundEngine } from "./soundEngine";

interface IGlobals {
  app: Application;
  crowd: Person[];
  player: Player;
  triggerLimbo: Function;
  spawnManager: SpawnManager;
  crowdContainer: Container; 
  sound: SoundEngine;
}

export const WALKING_SPEED = 3;
export const RUNNING_SPEED = 6;

export const Globals: IGlobals = {
  app: null,
  crowd: [],
  player: null,
  triggerLimbo: null,
  spawnManager: null,
  crowdContainer: null,
  sound: null
}
