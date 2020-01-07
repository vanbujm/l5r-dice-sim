import { sample } from 'lodash';
import { combinations } from './combitronics';

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

const sumMapper = (array2: number[]) => (value: number, index: number) =>
  value + array2[index];

type ResultTotals = [number, number, number];

const resolveDiceTotals = (type: RollType) => (
  [success, strife, opportunity, explode, image]: Roll,
  totals: ResultTotals
): ResultTotals => {
  const newTotal = totals.map(
    sumMapper([success, strife, opportunity])
  ) as ResultTotals;
  if (!explode) return newTotal;

  const newRoll = (type === 'r'
    ? sample<Roll>(ringDice)
    : sample<Roll>(skillDice)) as Roll;

  return resolveDiceTotals(type)(newRoll, newTotal);
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

const sumReducer = (index: number) => (acc: number, values: number[]) =>
  acc + values[index];

const isPassableRoll = (
  tn: number,
  to: number,
  keep: number,
  strife: number[]
) => {
  return (completeRoll: ResultTotals[]) => {
    return combinations(completeRoll, keep).some(combinationArray => {
      const successNum = combinationArray.reduce(sumReducer(0), 0);
      const strifeNum = combinationArray.reduce(sumReducer(1), 0);
      const opportunityNum = combinationArray.reduce(sumReducer(2), 0);
      if (successNum >= tn && opportunityNum >= to) {
        strife.push(strifeNum);
        return true;
      }
      return false;
    });
  };
};

export interface ProbabilityResult {
  sampleSize: number;
  probability: number;
  averageStrife: number;
}

const factorial = (num: number) => {
  let rval = 1;
  for (let i = 2; i <= num; i++) rval = rval * i;
  return rval;
};

const numCombinations = (types: number, choose: number) =>
  factorial(types + choose - 1) / (factorial(choose) * factorial(types - 1));

const MAX_SIMULATION_NUMBER = 100_000_000;

export const calculateProbability = (
  numR: number,
  numS: number,
  tn: number,
  to: number
): ProbabilityResult | null => {
  const types = numS + numR;
  const combinationsPerRoll = numCombinations(types, numR);

  const allowedSampleSize = Math.min(
    Math.floor(MAX_SIMULATION_NUMBER / combinationsPerRoll),
    500_000
  );

  if (allowedSampleSize < 1 || Number.isNaN(combinationsPerRoll)) {
    console.error('numbers are too big');
    return null;
  }

  const simulationPool = Array.from({ length: allowedSampleSize }, () => {
    const ringDices = Array.from({ length: numR }, () =>
      resolveDiceTotals('r')(sample(ringDice) as Roll, [0, 0, 0])
    );
    const skillDices = Array.from({ length: numR }, () =>
      resolveDiceTotals('s')(sample(ringDice) as Roll, [0, 0, 0])
    );

    return ringDices.concat(skillDices);
  });

  const strife: number[] = [];

  const successfulRolls = simulationPool.filter(
    isPassableRoll(tn, to, numR, strife)
  );

  const averageStrife =
    strife.length > 0
      ? strife.reduce((acc, numS) => acc + numS, 0) / strife.length
      : 0;

  return {
    sampleSize: allowedSampleSize,
    probability: successfulRolls.length / allowedSampleSize,
    averageStrife
  };
};
