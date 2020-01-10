import { sumMapper } from './rollSimulator';

describe('sumMapper', () => {
  it('adds two arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 4, 5];
    expect(arr1.map(sumMapper(arr2))).toEqual([4, 6, 8]);
  });
});
