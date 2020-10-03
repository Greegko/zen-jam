import { Sprite } from 'pixi.js';
import { WALKING_SPEED, RUNNING_SPEED, RESOURCES } from './globals';

class Person {
  public sprite: Sprite;
  private maxVelocityWalk: number;
  private maxVelocityRun: number;
  private accelleration: number;
  private moving: boolean;
  private running: boolean;
  private movementDirection: number[];
  // private movementTarget: number[];
  private currentVelocity: number;
  private behaviourTimer: number;

  init(x: number, y: number) {
    this.sprite = new Sprite(
      RESOURCES["t_person"].texture
    );

    this.sprite.x = x;
    this.sprite.y = y;

    this.maxVelocityWalk = WALKING_SPEED;
    this.maxVelocityRun = RUNNING_SPEED;

    this.accelleration = 0.5;

    this.moving = true;
    this.running = false;
    this.movementDirection = [-1, 0];
    // this.movementTarget = [0, 0];
    this.currentVelocity = 0;

    this.behaviourTimer = 60 * 0.5;

  }

  update(delta) {
    this.applyMovement();
    this.tickBehaviour(delta)
  }

  applyMovement() {
    if (this.moving) {
      let maxVelocity = this.running ? this.maxVelocityRun : this.maxVelocityWalk;
      if (this.currentVelocity < maxVelocity) {
        this.currentVelocity += this.accelleration;
      }
      else this.currentVelocity = maxVelocity;
    }
    else {
      if (this.currentVelocity > 0) this.currentVelocity -= this.accelleration;
      else this.currentVelocity = 0;
    }

    //apply the movement direction o the two axes
    this.sprite.x += this.movementDirection[0] * this.currentVelocity;
    this.sprite.y += this.movementDirection[1] * this.currentVelocity;
  }

  tickBehaviour(delta) {

    this.behaviourTimer -= delta;
    if (this.behaviourTimer <= 0) {
      console.log("click!");
      this.behaviourTimer = 60 * 0.5;
      if (this.moving) this.moving = false;
      else {
        this.moving = true;
        this.movementDirection = [Math.random() * 2 - 1, Math.random() * 2 - 1];
      }

    }
    //console.log(this.behaviourTimer);

  }


}

export default Person;