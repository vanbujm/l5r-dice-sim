import { sample } from 'lodash';
import { combinations } from './combitronics';

export type Roll = [number, number, number, boolean, string];

// succ, strif, opp
const ringDiceOptions: Roll[] = [
  [0, 0, 0, false, 'black.png'],
  [1, 0, 0, false, 'blacks.png'],
  [1, 1, 0, false, 'blackst.png'],
  [1, 1, 0, true, 'blacket.png'],
  [0, 0, 1, false, 'blacko.png'],
  [0, 1, 1, false, 'blackot.png']
];

const skillDiceOptions: Roll[] = [
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
    ? sample<Roll>(ringDiceOptions)
    : sample<Roll>(skillDiceOptions)) as Roll;

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
    ? sample<Roll>(ringDiceOptions)
    : sample<Roll>(skillDiceOptions)) as Roll;

  return resolveDiceTotals(type)(newRoll, newTotal);
};

export const rollDice = (numR: number, numS: number) => {
  const ringDices = Array.from({ length: numR }, () =>
    sample(ringDiceOptions)
  ).map(dice => [resolveDie('r')(dice as any)].flat(Infinity));
  const skillDices = Array.from({ length: numS }, () =>
    sample(skillDiceOptions)
  ).map(dice => [resolveDie('s')(dice as any)].flat(Infinity));

  return {
    skillDices,
    ringDices
  };
};

const sumReducer = (index: number) => (acc: number, values: number[]) =>
  acc + values[index];

interface IIsPassableRoll {
  tn: number;
  to: number;
  keep: number;
  strife: number[];
  maxStrife: number;
}

const isPassableRoll = ({
  tn,
  to,
  keep,
  strife,
  maxStrife
}: IIsPassableRoll) => {
  return (completeRoll: ResultTotals[]) => {
    return combinations(completeRoll, keep).some(combinationArray => {
      const successNum = combinationArray.reduce(sumReducer(0), 0);
      const strifeNum = combinationArray.reduce(sumReducer(1), 0);
      const opportunityNum = combinationArray.reduce(sumReducer(2), 0);
      if (successNum >= tn && opportunityNum >= to && strifeNum <= maxStrife) {
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

interface ICalculateProbability {
  ringDice: number;
  skillDice: number;
  maxStrife: number;
  tn: number;
  to: number;
}

export const calculateProbability = ({
  ringDice,
  skillDice,
  maxStrife,
  tn,
  to
}: ICalculateProbability): ProbabilityResult | null => {
  const types = skillDice + ringDice;
  const combinationsPerRoll = numCombinations(types, ringDice);

  const allowedSampleSize = Math.min(
    Math.floor(MAX_SIMULATION_NUMBER / combinationsPerRoll),
    500_000
  );

  if (allowedSampleSize < 1 || Number.isNaN(combinationsPerRoll)) {
    console.error('numbers are too big');
    return null;
  }

  const skillResolver = resolveDiceTotals('s');
  const ringResolver = resolveDiceTotals('r');

  const simulationPool = Array.from({ length: allowedSampleSize }, () => {
    const ringDices = Array.from({ length: ringDice }, () =>
      skillResolver(sample(ringDiceOptions) as Roll, [0, 0, 0])
    );
    const skillDices = Array.from({ length: skillDice }, () =>
      ringResolver(sample(ringDiceOptions) as Roll, [0, 0, 0])
    );

    return [...ringDices, ...skillDices];
  });

  const strife: number[] = [];

  const successfulRolls = simulationPool.filter(
    isPassableRoll({ tn, to, keep: ringDice, strife, maxStrife })
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
