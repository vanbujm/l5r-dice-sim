// eslint-disable-next-line import/no-webpack-loader-syntax
import createWorker from 'workerize-loader!./rollSimulator';

const sampleWorker = createWorker<any>();

export const useRollWorker = () => sampleWorker;
