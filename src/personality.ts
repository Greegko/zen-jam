// import { Pixi, Globals } from './main'

export interface PersonalityEvent {
  condition: string; // Callback condition function name
  contitionOptions: object;
  result: string, // Callback function name
  resultOptions: object; // Callback function params
}

export interface Personality {
  behaviours: Record<string, Behaviour>;
  events: PersonalityEvent[];
}

export interface Behaviour {
  default?: boolean;
  actions: Record<string, Action>;

}

export interface Action {
  default?: boolean;
  type: string; // Callback functio name
  options: object;
  nextActions: string[] // Random options for Callback functions 
}

export const PERSONALITIES: Record<string, Personality> = {
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
    events: [
      {
        condition: "approach",
        contitionOptions: { validTriggers: ["player"], distance: 2, setTriggerAsTarget: true },
        result: "changeBehaviour",
        resultOptions: { behaviour: "moveAway" }
      }
    ]
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
};
