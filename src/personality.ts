// import { Pixi, Globals } from './main'

export interface PersonalityEvent {
  checkFunction: string; // Callback condition function name
  checkFunctionOptions: object;
  callbackFunction: string, // Callback function name
  callbackFunctionOptions: object; // Callback function params
  applyOnlyOnPlayer: Boolean;
}

export interface Personality {
  behaviours: Record<string, Behaviour>;
  events: Record<string, PersonalityEvent>;
}

export interface Behaviour {
  default?: boolean;
  actions: Record<string, Action>;
  possibleEvents: string[];

}

export interface Action {
  default?: boolean;
  type: string; // Callback functio name
  options: object;
  nextActions: string[] // Random options for Callback functions 
}

export const PERSONALITIES: Record<string, Personality> = {
  // lazy: {
  //   behaviours: {
  //     idle: {
  //       default: true,
  //       actions: {
  //         smallWait: {
  //           default: true,
  //           type: "wait",
  //           options: { duration: 60 * 2 },
  //           nextActions: ["shortWalk", "smallWait"]
  //         },
  //         // longWait: {
  //         //   type: "wait",
  //         //   options: { duration: 60 * 10 },
  //         //   nextActions: ["shortWalk", "emote"]
  //         // },
  //         shortWalk: {
  //           type: "walkTo",
  //           options: { random: true, radius: 100 },
  //           nextActions: ["smallWait", "shortWalk"]
  //         },
  //         // emote: {
  //         //   type: "playIdleAnimation",
  //         //   options: { animation: "hello", repetition: 1 },
  //         //   nextActions: [["smallWait", 3], ["longWait", 1], ["shortWalk", 2]]
  //         // },
  //       }
  //     },
  //     moveAway: {
  //       actions: {
  //         moveAway: {
  //           type: "moveWithTarget",
  //           options: { direction: -1, run: false, distanceExit: 2 },
  //           nextActions: []
  //         }
  //       }
  //     },
  //   },
  //   events: [
  //     // {
  //     //   condition: "approach",
  //     //   contitionOptions: { validTriggers: ["player"], distance: 2, setTriggerAsTarget: true },
  //     //   result: "changeBehaviour",
  //     //   resultOptions: { behaviour: "moveAway" }
  //     // }
  //   ]
  // },
  friend: {
    behaviours: {
      idle: {
        default: true,
        possibleEvents: ["followPlayerWhenClose"],
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
        possibleEvents: [],
        actions: {
          followPlayer: {
            default: true,
            type: "followPlayer",
            options: {},
            nextActions: []
          }
        }
      },
    },
    events: {
      followPlayerWhenClose :
        {
          checkFunction: "hasApproached",
          checkFunctionOptions: { validTriggers: ["player"], distance: 40, setTriggerAsTarget: true },
          callbackFunction: "changeBehaviour",
          callbackFunctionOptions: { behaviour: "followPlayer" },
          applyOnlyOnPlayer: true
        }
      },
    }
};
