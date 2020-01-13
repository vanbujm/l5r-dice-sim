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

export const sumMapper = (array2: number[]) => (value: number, index: number) =>
  value + array2[index];

type ResultTotals = [number, number, number];

export const resolveDiceTotals = (type: RollType) => (
  [success, strife, opportunity, explode, image]: Roll,
  totals: ResultTotals,
  explosions: number[]
): ResultTotals => {
  const newTotal = totals.map(
    sumMapper([success, strife, opportunity])
  ) as ResultTotals;
  if (!explode) return newTotal;
  explosions.push(1);

  const newRoll = (type === 'r'
    ? sample<Roll>(ringDiceOptions)
    : sample<Roll>(skillDiceOptions)) as Roll;

  return resolveDiceTotals(type)(newRoll, newTotal, explosions);
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

const sumReducer = (acc: number[], values: number[]) => {
  acc[0] += values[0];
  acc[1] += values[1];
  acc[2] += values[2];
  return acc;
};

interface IIsPassableRoll {
  tn: number;
  to: number;
  keep: number;
  strife: number[];
  success: number[];
  opportunity: number[];
  maxStrife: number;
}

const isPassableRoll = ({
  tn,
  to,
  keep,
  strife,
  success,
  opportunity,
  maxStrife
}: IIsPassableRoll) => {
  return (completeRoll: ResultTotals[]) => {
    const [
      maxSuccessNum,
      maxStrifeNum,
      maxOpportunityNum
    ] = completeRoll.reduce(sumReducer as any, [0, 0, 0]);

    const cantSucceed = !(
      maxSuccessNum >= tn &&
      maxOpportunityNum >= to &&
      maxStrifeNum <= maxStrife
    );

    if (cantSucceed) return false;
    return combinations(completeRoll, keep).some(combinationArray => {
      const [
        successNum,
        strifeNum,
        opportunityNum
      ] = combinationArray.reduce(sumReducer, [0, 0, 0]);

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
  averageSuccess: number;
  averageOpportunity: number;
  averageExplosions: number;
  combinationsPerRoll: number;
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

  const explosions: number[] = [];

  console.info('Creating Simulation pools');

  const simulationPool = [];

  const strife: number[] = [];
  const success: number[] = [];
  const opportunity: number[] = [];

  const passableRollFilter = isPassableRoll({
    tn,
    to,
    keep,
    strife,
    success,
    opportunity,
    maxStrife
  });

  // do it old skool for speeeeeed
  for (let index = 0; index < allowedSampleSize; index += 1) {
    const ringDices = Array(ringDice);
    for (let indexR = 0; indexR < ringDice; indexR += 1) {
      const roll = sample(ringDiceOptions) as Roll;
      ringDices[indexR] = ringResolver(roll, [0, 0, 0], explosions);
    }
    const skillDices = Array(skillDice);
    for (let indexS = 0; indexS < skillDice; indexS += 1) {
      const roll = sample(skillDiceOptions) as Roll;
      skillDices[indexS] = skillResolver(roll, [0, 0, 0], explosions);
    }

    const totalRoll = ringDices.concat(skillDices);
    const isPassable = passableRollFilter(totalRoll);
    if (isPassable) {
      simulationPool.push(totalRoll);
    }

    if (
      index === 0 ||
      progressPoints.includes(index) ||
      index === allowedSampleSize - 1
    ) {
      // eslint-disable-next-line no-restricted-globals
      self.postMessage({
        type: WORKER_TYPE,
        message: index / allowedSampleSize
      });
    }
  }

  console.info('Calculating averages');
  const adder = (acc: number, numS: number) => acc + numS;

  const averageStrife = strife.reduce(adder, 0) / strife.length;
  const averageSuccess = success.reduce(adder, 0) / success.length;
  const averageOpportunity = opportunity.reduce(adder, 0) / opportunity.length;

  const averageExplosions = explosions.length / allowedSampleSize;

  const result = {
    sampleSize: allowedSampleSize,
    probability: simulationPool.length / allowedSampleSize,
    averageStrife,
    combinationsPerRoll,
    averageSuccess,
    averageOpportunity,
    averageExplosions
  };

  console.info(result);
  return result;
};
