import { sample } from 'lodash';

export type Roll = [number, number, number, boolean, string];

// succ, strif, opp
const ringDice: Roll[] = [
  [0, 0, 0, false, 'black.png'],
  [1, 0, 0, false, 'blacks.png'],
  [1, 1, 0, false, 'blackst.png'],
  [1, 1, 0, true, 'blacket.png'],
  [0, 0, 1, false, 'blacko.png'],
  [0, 1, 1, false, 'blackot.png']
];

const skillDice: Roll[] = [
  [0, 0, 0, false, 'white.png'],
  [0, 0, 0, false, 'white.png'],
  [1, 0, 0, false, 'whites.png'],
  [1, 0, 0, false, 'whites.png'],
  [1, 0, 1, false, 'whiteso.png'],
  [1, 1, 0, false, 'whitest.png'],
  [1, 1, 0, false, 'whitest.png'],
  [1, 0, 0, true, 'whitee.png'],
  [1, 1, 0, true, 'whiteet.png'],
  [0, 0, 1, false, 'whiteo.png'],
  [0, 0, 1, false, 'whiteo.png'],
  [0, 0, 1, false, 'whiteo.png']
];

const SAMPLE_SIZE = 1000000;

export interface RollResult {
  success: number;
  strife: number;
  opportunity: number;
  explode: boolean;
  image: string;
}

type RollType = 'r' | 's';

const resolveDie = (type: RollType) => ([
  success,
  strife,
  opportunity,
  explode,
  image
]: Roll): any => {
  const roll: RollResult = { success, strife, opportunity, explode, image };
  if (!explode) return roll;

  const newRoll = (type === 'r'
    ? sample<Roll>(ringDice)
    : sample<Roll>(skillDice)) as Roll;

  return [roll, resolveDie(type)(newRoll)];
};

export const rollDice = (numR: number, numS: number) => {
  const ringDices = Array.from({ length: numR }, () =>
    sample(ringDice)
  ).map(dice => [resolveDie('r')(dice as any)].flat(Infinity));
  const skillDices = Array.from({ length: numS }, () =>
    sample(skillDice)
  ).map(dice => [resolveDie('s')(dice as any)].flat(Infinity));

  return {
    skillDices,
    ringDices
  };
};

// const averageRoll = (numR: number, numS: number) => {
//   const rolls = Array.from({ length: SAMPLE_SIZE }, () => rollDice(numR, numS));
//   const totalResults = rolls.reduce(
//     (acc, arg) => {
//       const { successes, strife, oppertunity } = arg;
//       acc.successes += successes;
//       acc.strife += strife;
//       acc.oppertunity += oppertunity;
//       return acc;
//     },
//     { successes: 0, strife: 0, oppertunity: 0 }
//   );
//
//   totalResults.successes /= SAMPLE_SIZE;
//   totalResults.strife /= SAMPLE_SIZE;
//   totalResults.oppertunity /= SAMPLE_SIZE;
//   console.log(totalResults);
// };

// ring die
// {
//     avgSuccesses: 0.5999522,
//     avgStrife: 0.6001105,
//     avgOppertunity: 0.3999953
// }

// skill die
// {
//     avgSuccesses: 0.6999872,
//     avgStrife: 0.2997658,
//     avgOppertunity: 0.4000546
// }
