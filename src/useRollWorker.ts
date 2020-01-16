// eslint-disable-next-line import/no-webpack-loader-syntax
import createWorker from 'workerize-loader!./rollSimulator';

let sampleWorker = createWorker<any>();

let lastSeenVal: boolean | undefined;

export const useRollWorker = (terminated: boolean) => {
  if (lastSeenVal && !terminated) {
    console.log('creating a new worker');
    sampleWorker = createWorker<any>();
  }
  lastSeenVal = terminated;
  return sampleWorker;
};
