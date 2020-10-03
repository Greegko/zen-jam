import { Sprite } from 'pixi.js';
import { Action, Behaviour, PERSONALITIES, Personality } from './personality';
import Tools from "./tools";
import { WALKING_SPEED, RUNNING_SPEED, Globals } from './globals';

interface PersonAction {
  setup: any;
  update: any;
}

class Person {
  public sprite: Sprite;
  private maxVelocityWalk: number;
  private maxVelocityRun: number;
  private accelleration: number;
  private movemetPointTargetSensibility: number;

  private moving: boolean;
  private running: boolean;
  private movementDirection: number[];
  private movemetPointTarget: number[];
  private targetPerson: any;
  private personality: string;
  private currentBehaviour: Behaviour;
  private currentAction: Action;

  // private movementTarget: number[];
  private actions: Record<string, PersonAction>;
  private eventChecks: Record<string, any>;
  private eventCallbacks: Record<string, any>;

  private currentVelocity: number;
  private exitActionTimer: number;

  constructor(_personality: string){
    this.personality = _personality;
  }

  init(sprite: Sprite, x: number, y: number) {
    this.sprite = sprite;

    this.sprite.x = x;
    this.sprite.y = y;

    this.maxVelocityWalk = WALKING_SPEED;
    this.maxVelocityRun = RUNNING_SPEED;

    this.accelleration = 0.5;
    this.movemetPointTargetSensibility = 20;

    this.moving = false;
    this.running = false;
    this.movementDirection = [-1, 0];
    this.currentVelocity = 0;
    
    this.currentBehaviour = this.getDefaultBehaviour(PERSONALITIES[this.personality]);
    this.currentAction = this.getDefaultAction(this.currentBehaviour);

    this.exitActionTimer = 0;
    this.movemetPointTarget = [0, 0];
    this.targetPerson = null;

    this.actions = {
      wait: {
        setup: (args) => {
          if(args.duration.length > 1) this.exitActionTimer = Tools.randomFromRange(args.duration[0], args.duration[1]);
          this.exitActionTimer = args.duration[0];
          
        },
        update: () => {
          this.exitActionTimer--;
          if (this.exitActionTimer <= 0) {
            // console.log("wait is over");

            this.changeAction();
          }
        }
      },
      moveTo: {
        setup: (args) => {
          
          if (args.randomDirection) {
            let randomAngle = Math.random() * 2 * Math.PI;
            let randomVector = [Math.cos(randomAngle), Math.sin(randomAngle)];

            this.movementDirection = randomVector.slice() //slice is used as a copy method
            
            let distance;
            if(args.distance.length > 1) distance = Tools.randomFromRange(args.distance[0], args.distance[1]);
            else distance = args.distance[0];

            randomVector[0] *= distance;
            randomVector[1] *= distance;

            this.movemetPointTarget = [this.sprite.x + randomVector[0], this.sprite.y + randomVector[1]];

            this.moving = true;
            this.running = args.running;

            // console.log("My Pos ", this.sprite.x + ", " + this.sprite.y);
            // console.log("Moving To", this.movemetPointTarget);

          }
        },
        update: () => {

          let arrived = Tools.isPointAtTarget(
            this.sprite.x,
            this.sprite.y,
            this.movemetPointTarget[0],
            this.movemetPointTarget[1],
            this.movemetPointTargetSensibility,
          );
          if (arrived) {
            this.moving = false;
            this.changeAction();
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
      chasePlayer:{
        setup: (args)=>{
          this.moving = true;
          this.running = args.running;

          if(args.duration.length > 1) this.exitActionTimer = Tools.randomFromRange(args.duration[0], args.duration[1]);
          this.exitActionTimer = args.duration[0];

          let dir = Tools.directionFromPoint1to2(
            [this.sprite.x, this.sprite.y],
            [this.targetPerson.sprite.x, this.targetPerson.sprite.y],
          );
          this.movementDirection = dir.slice();
        },
        update: (args)=>{

          let dir = Tools.directionFromPoint1to2(
            [this.sprite.x, this.sprite.y],
            [this.targetPerson.sprite.x, this.targetPerson.sprite.y],
          );
          this.movementDirection = dir.slice();

          this.exitActionTimer--
          console.log(this.exitActionTimer);
          
          if (this.exitActionTimer <= 0) {
            this.moving = false;
            this.changeAction();
          }
        }
      },
      stepAwayFromTarget:{
        setup: (args) => {
          this.running = args.running;
          this.moving = true;

          let dir = [
            this.sprite.x - this.targetPerson.sprite.x,
            this.sprite.y - this.targetPerson.sprite.y,
          ];
          let dir_length = Math.sqrt(Math.pow(dir[0], 2) + Math.pow(dir[1], 2));

          dir = [dir[0] / dir_length, dir[1] / dir_length];

          this.movementDirection = dir.slice();

          dir = [dir[0] * args.distance, dir[1] * args.distance];

          this.movemetPointTarget = [this.sprite.x + dir[0], this.sprite.y + dir[1]];

        },
        update: () => {
          // console.log("going", this.movemetPointTarget);

          let arrived = Tools.isPointAtTarget(
            this.sprite.x,
            this.sprite.y,
            this.movemetPointTarget[0],
            this.movemetPointTarget[1],
            this.movemetPointTargetSensibility,
          );
          if (arrived) {
            this.moving = false;
            this.changeAction();
          }
        },
      }

    };
    this.eventChecks = {
      hasApproached: (args, target) => {
        //target can be player or person

        let posA = [this.sprite.x, this.sprite.y];
        let posB = [target.sprite.x, target.sprite.y];
        let dist = Tools.distanceBetweenTwoPoints(posA, posB);
        if (dist < args.distance) {
          console.log("TOUCHED!!!");
          if (args.setTriggerAsTarget) this.targetPerson = target;
          return true;
        }
        else return false;
      }
    }
    this.eventCallbacks = {
      changeBehaviour: (args) => {
        this.currentBehaviour = PERSONALITIES[this.personality].behaviours[args.behaviour];
        this.currentAction = this.getDefaultAction(this.currentBehaviour);
        this.actions[this.currentAction.type].setup(this.currentAction.options);


      }
    }

    //Launch first action
    this.actions[this.currentAction.type].setup(this.currentAction.options);
  }

  update(delta, my_index) {
    this.applyMovement();
    this.checkForEvents(my_index);
    this.actions[this.currentAction.type].update();
    //this.tickBehaviour(delta)
  }

  checkForEvents(my_index) {

    let listOfEvents = [];

    for (let i = 0; i < this.currentBehaviour.possibleEvents.length; i++) {
      const eventName = this.currentBehaviour.possibleEvents[i];
      
      const event = PERSONALITIES[this.personality].events[eventName];

      if (event.applyOnlyOnPlayer) {
        if (this.eventChecks[event.checkFunction](event.checkFunctionOptions, Globals.player)) {
          this.eventCallbacks[event.callbackFunction](event.callbackFunctionOptions);
        }
      }
      else listOfEvents.push(event);
    }

    for (let i = 0; i < Globals.crowd.length; i++) {
      if (i == my_index) continue; //avoid checking against itself
      //@ts-ignore
      const person = Globals.crowd[i];

      for (let j = 0; j < listOfEvents.length; j++) {
        const event = listOfEvents[j];
        if (event.applyOnlyOnPlayer) continue;



      }


    }

  }

  collade() {

  }

  private giveNextAction(action) {

    if(action.nextActions.length > 0){
      
      let newAction = action.nextActions[Math.floor(Math.random() * action.nextActions.length)];
      return this.currentBehaviour.actions[newAction];
    }
    else {
      this.currentBehaviour = this.getDefaultBehaviour(PERSONALITIES[this.personality]);
      return this.getDefaultAction(this.currentBehaviour);
    }

  }

  private getDefaultBehaviour(personality: Personality) {
    for (let key in personality.behaviours) {
      let behaviour = personality.behaviours[key];
      if (behaviour.default) return behaviour;
    }
    throw 'No default behaviour in this personality!';
  }

  private getDefaultAction(behaviour: Behaviour): Action {
    for (let key in behaviour.actions) {
      let action = behaviour.actions[key];
      if (action.default) return action;
    }

    throw 'No default action in this behaviour!';
  }

  private changeAction() {
    this.currentAction = this.giveNextAction(this.currentAction);
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