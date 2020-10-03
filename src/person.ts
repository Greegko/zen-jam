import { Sprite } from 'pixi.js';
import Personality from './personality';
import Tools from "./tools";
import { WALKING_SPEED, RUNNING_SPEED, RESOURCES, Globals } from './globals';

class Person {
  public sprite: Sprite;
  private maxVelocityWalk: number;
  private maxVelocityRun: number;
  private accelleration: number;
  private moving: boolean;
  private running: boolean;
  private movementDirection: number[];
  private movemetPointTarget: number[];
  // private movementTarget: number[];
  private currentVelocity: number;
  public personality: Personality;
  private currentAction: any;
  private actions: Object;
  private exitActionTimer: number;

  init(x: number, y: number) {
    this.sprite = new Sprite(
      RESOURCES["t_person"].texture
    );

    this.sprite.x = x;
    this.sprite.y = y;

    this.maxVelocityWalk = WALKING_SPEED;
    this.maxVelocityRun = RUNNING_SPEED;

    this.accelleration = 0.5;

    this.moving = false;
    this.running = false;
    this.movementDirection = [-1, 0];
    // this.movementTarget = [0, 0];
    this.currentVelocity = 0;

    this.personality = new Personality({ type: "friend" });
    this.currentAction = this.personality.setup();

    this.exitActionTimer = 0;
    this.movemetPointTarget = [0, 0];

    this.actions = {
      wait: {
        setup: (args) => {
          this.exitActionTimer = args.duration;

        },
        update: () => {
          this.exitActionTimer--;
          if (this.exitActionTimer <= 0) {
            // console.log("wait is over");

            this.exitAction();
          }
        }
      },
      walkTo: {
        setup: (args) => {
          if (args.random) {
            let randomAngle = Math.random() * 2 * Math.PI;
            let randomVector = [Math.cos(randomAngle), Math.sin(randomAngle)];

            this.movementDirection = randomVector.slice() //slice is used as a copy method

            //the distance to which they move is fixed
            randomVector[0] *= args.radius;
            randomVector[1] *= args.radius;

            this.movemetPointTarget = [this.sprite.x + randomVector[0], this.sprite.y + randomVector[1]];

            this.moving = true;
            this.running = false;

            // console.log("My Pos ", this.sprite.x + ", " + this.sprite.y);
            // console.log("Moving To", this.movemetPointTarget);

          }
        },
        update: () => {

          let arrived = Tools.isPointInRect(
            this.sprite.x,
            this.sprite.y,
            this.movemetPointTarget[0] - 5,
            this.movemetPointTarget[1] - 5,
            this.movemetPointTarget[0] + 5,
            this.movemetPointTarget[1] + 5,
          );
          if (arrived) {
            this.moving = false;
            // console.log("movement done");

            this.exitAction();
          }
        }
      },
      followPlayer: {
        setup: (args) => { },
        update: () => {
          this.moving = true;
          const xLength = Globals.player.sprite.x - this.sprite.x;
          const yLength = Globals.player.sprite.y - this.sprite.y;
          const x = xLength - xLength * .98;
          const y = yLength - yLength * .98;
          this.movementDirection = [x, y];
        }
      },

    };

    this.actions[this.currentAction.type].setup(this.currentAction.options);
  }

  checkForEvents() {
    this.personality
  }

  update(delta) {
    this.checkForEvents();
    this.applyMovement();
    this.actions[this.currentAction.type].update();
    //this.tickBehaviour(delta)
  }

  exitAction() {
    // console.log("Action Finished ---");
    this.changeAction();

  }

  collade() {

  }

  private changeAction() {
    this.currentAction = this.personality.giveNextAction(this.currentAction);
    //setUp the new action
    this.actions[this.currentAction.type].setup(this.currentAction.options);
  }

  private applyMovement() {
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

}

export default Person;