import { sample } from 'lodash';
import { combinations } from './combitronics';
import { WORKER_TYPE } from './workerTypes';

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
  success: number[];
  opportunity: number[];
  maxStrife: number;
  arrayLength: number;
  difficultyProportion: number;
}

const isPassableRoll = ({
  tn,
  to,
  keep,
  strife,
  success,
  opportunity,
  maxStrife,
  arrayLength,
  difficultyProportion
}: IIsPassableRoll) => {
  const numPoints = Math.round(difficultyProportion * 100);
  // @ts-ignore
  const progressPoints: number[] = [...Array(numPoints).keys()].map(val =>
    Math.round(((val + 1) / numPoints) * arrayLength)
  );
  return (completeRoll: ResultTotals[], index: number, arr: any[]) => {
    if (progressPoints.includes(index)) {
      const completionPercentage =
        (index / arrayLength) * difficultyProportion +
        (1 - difficultyProportion);
      // eslint-disable-next-line no-restricted-globals
      self.postMessage({
        type: WORKER_TYPE,
        message: completionPercentage
      });
    }
    return combinations(completeRoll, keep).some(combinationArray => {
      const successNum = combinationArray.reduce(sumReducer(0), 0);
      const strifeNum = combinationArray.reduce(sumReducer(1), 0);
      const opportunityNum = combinationArray.reduce(sumReducer(2), 0);
      if (successNum >= tn && opportunityNum >= to && strifeNum <= maxStrife) {
        strife.push(strifeNum);
        success.push(successNum);
        opportunity.push(opportunityNum);
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

const numCombinations = (totalDice: number, keep: number) =>
  factorial(totalDice + keep - 1) /
  (factorial(keep) * factorial(totalDice - 1));

interface ICalculateProbability {
  ringDice: number;
  skillDice: number;
  maxStrife: number;
  tn: number;
  to: number;
  keep: number;
}

export const calculateProbability = ({
  ringDice,
  skillDice,
  maxStrife,
  tn,
  to,
  keep
}: ICalculateProbability): ProbabilityResult | null => {
  console.info('Simulation started');
  console.info({ ringDice, skillDice, maxStrife, tn, to, keep });

  const totalDice = skillDice + ringDice;
  const combinationsPerRoll = numCombinations(totalDice, keep);

  const xVal = (skillDice + ringDice) / 2;

  // magic from a best fit graph done in excel
  const exponent = -0.0373 * Math.pow(xVal, 2) + 0.0189 * xVal + 6.2965;

  const allowedSampleSize = Math.floor(Math.pow(10, exponent));

  if (allowedSampleSize < 1 || Number.isNaN(combinationsPerRoll)) {
    console.error('numbers are too big');
    return null;
  }

  const skillResolver = resolveDiceTotals('s');
  const ringResolver = resolveDiceTotals('r');

  // @ts-ignore
  const progressPoints: number[] = [...Array(100).keys()].map(val =>
    Math.round((val / 100) * allowedSampleSize)
  );

  const simulationPoolDifficultyProportion = 1 - xVal / (14 * 1.1);

  console.info('Creating Simulation pools');
  const simulationPool = Array.from(
    { length: allowedSampleSize },
    (_, index) => {
      const ringDices = Array.from({ length: ringDice }, () =>
        skillResolver(sample(ringDiceOptions) as Roll, [0, 0, 0])
      );
      const skillDices = Array.from({ length: skillDice }, () =>
        ringResolver(sample(ringDiceOptions) as Roll, [0, 0, 0])
      );
      if (
        index === 0 ||
        progressPoints.includes(index) ||
        index === allowedSampleSize - 1
      ) {
        // eslint-disable-next-line no-restricted-globals
        self.postMessage({
          type: WORKER_TYPE,
          message:
            (index / allowedSampleSize) * simulationPoolDifficultyProportion
        });
      }

      return [...ringDices, ...skillDices];
    }
  );

  const strife: number[] = [];
  const success: number[] = [];
  const opportunity: number[] = [];

  const isPassableRollDifficultyProportion =
    1 - simulationPoolDifficultyProportion;

  console.info('Evaluating for success');
  const successfulRolls = simulationPool.filter(
    isPassableRoll({
      tn,
      to,
      keep,
      strife,
      success,
      opportunity,
      maxStrife,
      arrayLength: simulationPool.length,
      difficultyProportion: isPassableRollDifficultyProportion
    })
  );

  console.info('Calculating average strife');
  const averageStrife =
    strife.length > 0
      ? strife.reduce((acc, numS) => acc + numS, 0) / strife.length
      : 0;
  const averageSuccess =
    success.length > 0
      ? success.reduce((acc, numS) => acc + numS, 0) / success.length
      : 0;
  const averageOpportunity =
    opportunity.length > 0
      ? opportunity.reduce((acc, numS) => acc + numS, 0) / opportunity.length
      : 0;

  const result = {
    sampleSize: allowedSampleSize,
    probability: successfulRolls.length / allowedSampleSize,
    averageStrife
  };
  console.info({
    ...result,
    combinationsPerRoll,
    averageSuccess,
    averageOpportunity
  });
  return result;
};
