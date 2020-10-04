import { Sprite } from 'pixi.js';
import Person from './person'
import Tools from './tools'
import { Globals } from './globals';
import {getRandomCharacterSprite } from './assets';

export interface Scene {
  spawnAreaDensity: number,
  targetCrowd: Record<string, number>,
}

export class SpawnManager {

  private sceneCount: any;
  private sceneModes: Scene[];
  public currentScene: number;

  private spawnZoneSmall: number; 
  private spawnZoneBig: number;
  private recicleDistance: number;

  private recycleRectangle: number[];
  private spawnRectangles: any;

  constructor() {

    this.spawnZoneSmall = 200;
    this.spawnZoneBig = 500;
    this.recicleDistance = 1000;


    this.sceneCount = {
      lazy: 0,
      calm: 0,
      shy: 0,
      friend: 0,
      snapper: 0,
      stalker: 0,
      rager: 0,
      spawnArea: 0,
    };
    this.sceneModes = [
      {
        spawnAreaDensity: 50,
        targetCrowd : {
          lazy:  30,
          calm: 0,
          shy:  60,
          friend: 1,
          snapper: 3,
          stalker: 0,
          rager: 0,
        }
      }
    ];
    this.currentScene = 0;
    
    this.recalculateRectangles();
    
  }
  recalculateRectangles(){
    let player = Globals.player.sprite;

    this.recycleRectangle = [
      player.x -this.recicleDistance, player.y -this.recicleDistance,
      player.x + this.recicleDistance, player.y  + this.recicleDistance 
    ];
    this.spawnRectangles = {
      up: [
        player.x - this.spawnZoneBig,
        player.y - this.spawnZoneBig,
        player.x + this.spawnZoneBig,
        player.y - this.spawnZoneSmall,
      ],
      left: [
        player.x - this.spawnZoneBig,
        player.y - this.spawnZoneBig,
        player.x - this.spawnZoneSmall,
        player.y + this.spawnZoneBig,
      ],
      right: [
        player.x + this.spawnZoneSmall,
        player.y - this.spawnZoneBig,
        player.x + this.spawnZoneBig,
        player.y + this.spawnZoneBig,
      ],
      down: [
        player.x - this.spawnZoneBig,
        player.y + this.spawnZoneSmall,
        player.x + this.spawnZoneBig,
        player.y + this.spawnZoneBig,
      ],
      smallRect: [
        player.x - this.spawnZoneSmall,
        player.y - this.spawnZoneSmall,
        player.x + this.spawnZoneSmall,
        player.y + this.spawnZoneSmall,
      ],
      bigRect: [
        player.x - this.spawnZoneBig,
        player.y - this.spawnZoneBig,
        player.x + this.spawnZoneBig,
        player.y + this.spawnZoneBig,
      ]
    };
  }
  spawnDecision() {
    
    let dir = [Globals.player.xDirection, Globals.player.yDirection];
    if(!dir[0] && !dir[1]) return;
    
    let scene = this.sceneModes[this.currentScene];
    let numberToSpawn = scene.spawnAreaDensity - this.sceneCount.spawnArea;
    let spawnCandidate = {
          lazy: scene.targetCrowd.lazy - this.sceneCount.lazy,
          calm: scene.targetCrowd.calm - this.sceneCount.calm,
          shy:  scene.targetCrowd.shy - this.sceneCount.shy,
          friend: scene.targetCrowd.friend - this.sceneCount.friend,
          snapper: scene.targetCrowd.snapper - this.sceneCount.snapper,
          stalker: scene.targetCrowd.stalker - this.sceneCount.stalker,
          rager: scene.targetCrowd.rager - this.sceneCount.rager,
    }
    
    for (let i = 0; i < numberToSpawn; i++) {

      let key = Tools.randomKeyInObj(spawnCandidate);
      
      if(spawnCandidate[key] > 0){
        spawnCandidate[key]--;
        this.spawn(key, 0, 0);
      }
      else delete spawnCandidate[key];

      
    }
    

    this.sceneCount = {
      lazy: 0,
      calm: 0,
      shy: 0,
      friend: 0,
      snapper: 0,
      stalker: 0,
      rager: 0,
      spawnArea: 0,
    };
  }
  spawn(personality: string, x, y){
    console.log(Globals.crowd.length + " +++");
    
    let spawnZone;

    let dir = [Globals.player.xDirection, Globals.player.yDirection];


    if(Math.abs(dir[0]) > Math.abs(dir[1])){
      spawnZone = dir[0] > 0? this.spawnRectangles.right : this.spawnRectangles.left;
    }
    else{
      spawnZone = dir[1] > 0? this.spawnRectangles.down : this.spawnRectangles.up;
    }

    let point = Tools.randomPointInRectangle(spawnZone);
    point = [x, y];
    console.log(point);
    

    //final spawn
    let person = new Person(personality);
    person.init(getRandomCharacterSprite(), point[0], point[1]);
    Globals.crowd.push(person);
    Globals.crowdContainer.addChild(person.sprite);
    if(person.overlaySprite instanceof Sprite) Globals.crowdContainer.addChild(person.overlaySprite);

  }
  managePerson(person: Person){
    
    let recycle = !Tools.ispointInsideRectangle(
      [person.sprite.x, person.sprite.y],
      this.recycleRectangle
    )
    if(recycle) {
      person.toBeRecycled = true;
      console.log(Globals.crowd.length);
    }

    //count the person
    this.sceneCount[person.personality]++;

    //check if person is in spawn area
    if(
      !Tools.ispointInsideRectangle(
        [person.sprite.x, person.sprite.y],
        this.spawnRectangles.smallRect)
      &&
      Tools.ispointInsideRectangle(
        [person.sprite.x, person.sprite.y],
        this.spawnRectangles.bigRect)
    ) this.sceneCount.spawnArea++;

  }
  
}
