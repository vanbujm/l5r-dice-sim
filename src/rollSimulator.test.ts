// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import createRollWorker from 'workerize-loader!./rollSimulator';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // @ts-ignore
    interface Matchers<R> {
      toBeWithinRange(a: number, b: number): R;
    }
  }
}

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false
      };
    }
  }
});

const rollWorker = createRollWorker<any>();
const { sumMapper } = rollWorker;

console.info = jest.fn();

// eslint-disable-next-line no-restricted-globals
self.postMessage = jest.fn();

describe('sumMapper', () => {
  it('adds two arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 4, 5];
    expect(arr1.map((sumMapper as any)(arr2))).toEqual([4, 6, 8]);
  });
});

describe('calculateProbability', () => {
  it('runs for 2k1', async () => {
    const results = await rollWorker.calculateProbability({
      ringDice: 1,
      skillDice: 1,
      maxStrife: 1,
      tn: 1,
      to: 1,
      keep: 1
    });
    const expectResults = {
      averageExplosions: 0.4000881325699394,
      averageOpportunity: 1,
      averageStrife: 0.2649467241683072,
      averageSuccess: 1.1181183788214206,
      combinationsPerRoll: 2,
      probability: 0.1376249115775203,
      sampleSize: 1897142
    };

    expect(results.averageExplosions).toBeCloseTo(
      expectResults.averageExplosions,
      2
    );
    expect(results.averageOpportunity).toBeCloseTo(
      expectResults.averageOpportunity,
      2
    );
    expect(results.averageStrife).toBeCloseTo(expectResults.averageStrife, 2);
    expect(results.averageSuccess).toBeCloseTo(expectResults.averageSuccess, 2);
    expect(results.combinationsPerRoll).toBe(expectResults.combinationsPerRoll);
    expect(results.probability).toBeCloseTo(expectResults.probability, 2);
    expect(results.sampleSize).toBe(expectResults.sampleSize);
  });

  it('runs for 20k10', async () => {
    const results = await rollWorker.calculateProbability({
      ringDice: 10,
      skillDice: 10,
      maxStrife: Infinity,
      tn: 1,
      to: 1,
      keep: 10
    });
    const expectResults = {
      sampleSize: 569,
      probability: 1,
      averageStrife: 6.114235500878735,
      combinationsPerRoll: 20030009.999999996,
      averageSuccess: 6.068541300527241,
      averageOpportunity: 3.9947275922671355,
      averageExplosions: 3.9806678383128293
    };

    expect(results.combinationsPerRoll).toBe(expectResults.combinationsPerRoll);

    expect(results.averageExplosions).toBeWithinRange(0, 10);
    expect(results.averageOpportunity).toBeWithinRange(0, 10);
    expect(results.averageStrife).toBeWithinRange(0, 10);
    expect(results.averageSuccess).toBeWithinRange(0, 10);
    expect(results.probability).toBeCloseTo(expectResults.probability, 2);
    expect(results.sampleSize).toBe(expectResults.sampleSize);
  });
});
