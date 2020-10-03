// import { Pixi, Globals } from './main'

class Personality {

  private personalities: Object;
  private currentBehaviour: any;
  private currentPersonality: Object;

  constructor(args) {
    this.personalities = {
      lazy: {
        behaviours: {
          idle: {
            default: true,
            actions: {
              smallWait: {
                default: true,
                type: "wait",
                options: { duration: 60 * 2 },
                nextActions: ["shortWalk", "smallWait"]
              },
              // longWait: {
              //   type: "wait",
              //   options: { duration: 60 * 10 },
              //   nextActions: ["shortWalk", "emote"]
              // },
              shortWalk: {
                type: "walkTo",
                options: { random: true, radius: 100 },
                nextActions: ["smallWait", "shortWalk"]
              },
              // emote: {
              //   type: "playIdleAnimation",
              //   options: { animation: "hello", repetition: 1 },
              //   nextActions: [["smallWait", 3], ["longWait", 1], ["shortWalk", 2]]
              // },
            }
          },
          moveAway: {
            actions: {
              moveAway: {
                type: "moveWithTarget",
                options: { direction: -1, run: false, distanceExit: 2 },
                nextActions: []
              }
            }
          },
        },
        events: {
          playerIsClose: {
            condition: "approach",
            contitionOptions: { validTriggers: ["player"], distance: 2, setTriggerAsTarget: true },
            result: "changeBehaviour",
            resultOptions: { behaviour: "moveAway" }
          }
        },
      },
      friend: {
        behaviours: {
          idle: {
            default: true,
            actions: {
              smallWait: {
                default: true,
                type: "wait",
                options: { duration: 60 * 2 },
                nextActions: ["shortWalk", "smallWait"]
              },
              shortWalk: {
                type: "walkTo",
                options: { random: true, radius: 100 },
                nextActions: ["smallWait", "shortWalk"]
              }
            }
          },
          followPlayer: {
            actions: {
              followPlayer: {
                type: "followPlayer",
                options: {},
                nextActions: []
              }
            }
          },
        },
        events: [
          // If the players close, start follow it
          {
            condition: "approach",
            contitionOptions: { validTriggers: ["player"], distance: 2, setTriggerAsTarget: true },
            result: "changeBehaviour",
            resultOptions: { behaviour: "followPlayer" }
          }
        ],
      }
    }

    this.currentPersonality = this.personalities[args.type];
    this.currentBehaviour = this.getDefaultBehaviour(this.currentPersonality);
    console.log(this.currentPersonality);
  }

  setup() {
    return this.getDefaultAction(this.currentBehaviour);
  }

  giveNextAction(action) {
    let newAction = action.nextActions[Math.floor(Math.random() * action.nextActions.length)];
    console.log("new action", newAction);

    return this.currentBehaviour.actions[newAction];
  }

  getDefaultBehaviour(personality) {
    for (let key in personality.behaviours) {
      let behaviour = personality.behaviours[key];
      if (behaviour.default) return behaviour;
    }
    throw 'No default behaviour in this personality!';
  }

  getDefaultAction(behaviour) {
    for (let key in behaviour.actions) {
      let action = behaviour.actions[key];
      if (action.default) return action;
    }
    throw 'No default action in this behaviour!';
  }


}

export default Personality;