
export interface Scene {
  total: number,
  lazy: number,
  calm: number,
  shy: number,
  friend: number,
  snapper: number,
  stalker: number,
  rager: number,
}

export class SpawnManager {

  private sceneCount: any;
  // private sceneModes: Record<string, number>;

  private spawnZoneStart: number; 
  private spawnZoneEnd: number;
  private recicleDistance: number;

  constructor() {

    this.spawnZoneStart = 200;
    this.spawnZoneEnd = 800;
    this.recicleDistance = 1000;

    console.log(this.spawnZoneStart);
    console.log(this.spawnZoneEnd);
    console.log(this.recicleDistance);

    this.sceneCount = {
      lazy: 0,
      calm: 0,
      shy: 0,
      friend: 0,
      snapper: 0,
      stalker: 0,
      rager: 0,
    }
    console.log(this.sceneCount);
    
  }

  update() {
    
  }
}
