import { Reducer } from 'react';
import { ProbabilityResult } from './rollSimulator';

export const UPDATE_SKILL_DICE = 'updateSkillDice';
export const UPDATE_RING_DICE = 'updateRingDice';
export const UPDATE_MAX_STRIFE = 'updateMaxStrife';
export const UPDATE_SKILLED_ASSIST = 'updateSkilledAssist';
export const UPDATE_UNSKILLED_ASSIST = 'updateUnskilledAssist';
export const UPDATE_TN = 'updateTargetNumber';
export const UPDATE_TO = 'updateTargetOpportunity';
export const REQUEST_CALCULATION = 'requestCalculation';
export const UPDATE_CALC_PROGRESS = 'updateCalcProgress';
export const UPDATE_IS_CANCELLED = 'updateIsCancelled';
export const SIMULATION_COMPLETE = 'simulationComplete';
export const CANCEL = 'cancel';
export const CLEAR = 'clear';

type ActionType =
  | 'updateSkillDice'
  | 'updateRingDice'
  | 'updateMaxStrife'
  | 'updateSkilledAssist'
  | 'updateUnskilledAssist'
  | 'simulate'
  | 'requestCalculation'
  | 'updateCalcProgress'
  | 'updateIsCancelled'
  | 'clear'
  | 'cancel'
  | 'updateTargetNumber'
  | 'simulationComplete'
  | 'updateTargetOpportunity';

export interface SimulationState {
  skillDice: number | string;
  ringDice: number | string;
  maxStrife: number | string;
  skilledAssist: boolean;
  unskilledAssist: boolean;
  to: number | string;
  tn: number | string;
  result: ProbabilityResult | null | undefined;
  loading: boolean;
  progress: number | string;
  requestCalc: boolean;
  isCancelled: boolean;
}

export interface SimulationAction {
  type: ActionType;
  payload?: number | boolean | ProbabilityResult;
}

export const initialState: SimulationState = {
  skillDice: 0,
  ringDice: 0,
  skilledAssist: false,
  unskilledAssist: false,
  maxStrife: Infinity,
  tn: 0,
  to: 0,
  result: undefined,
  loading: false,
  requestCalc: false,
  progress: 0,
  isCancelled: false
};

const noPayloadError = new Error('Missing payload');
const boolError = new Error('Not a boolean');

export type RollReducer = Reducer<SimulationState, SimulationAction>;

export const reducer: RollReducer = (state, action) => {
  const typeCorrectedPayload = action.payload as any;
  const noPayload = action.payload === undefined;
  switch (action.type) {
    case UPDATE_SKILL_DICE:
      if (noPayload) throw noPayloadError;
      return { ...state, skillDice: typeCorrectedPayload };
    case UPDATE_RING_DICE:
      if (noPayload) throw noPayloadError;
      return { ...state, ringDice: typeCorrectedPayload };
    case UPDATE_MAX_STRIFE:
      if (noPayload) throw noPayloadError;
      return { ...state, maxStrife: typeCorrectedPayload };
    case UPDATE_SKILLED_ASSIST:
      if (typeof action.payload !== 'boolean') throw boolError;
      if (noPayload) throw noPayloadError;
      return { ...state, skilledAssist: action.payload };
    case UPDATE_UNSKILLED_ASSIST:
      if (typeof action.payload !== 'boolean') throw boolError;
      if (noPayload) throw noPayloadError;
      return { ...state, unskilledAssist: action.payload };
    case UPDATE_TN:
      if (noPayload) throw noPayloadError;
      return { ...state, tn: typeCorrectedPayload };
    case UPDATE_IS_CANCELLED:
      if (noPayload) throw noPayloadError;
      if (typeof action.payload !== 'boolean') throw boolError;
      return { ...state, isCancelled: action.payload };
    case UPDATE_TO:
      if (noPayload) throw noPayloadError;
      return { ...state, to: typeCorrectedPayload };
    case UPDATE_CALC_PROGRESS:
      if (noPayload) throw noPayloadError;
      return { ...state, progress: typeCorrectedPayload };
    case SIMULATION_COMPLETE:
      if (noPayload) throw noPayloadError;
      if (
        action.payload !== null &&
        typeof action.payload !== 'object' &&
        typeof action.payload !== 'undefined'
      ) {
        throw new Error('Not a result');
      }
      return {
        ...state,
        requestCalc: false,
        loading: false,
        progress: 0,
        result: action.payload
      };
    case REQUEST_CALCULATION:
      return { ...state, requestCalc: true, loading: true, result: undefined };
    case CANCEL:
      const { loading, result, requestCalc, progress } = initialState;
      const stateUpdates = {
        isCancelled: true,
        loading,
        result,
        requestCalc,
        progress
      };
      return { ...state, ...stateUpdates };
    case CLEAR:
      return { ...initialState };
    default:
      throw new Error('Unknown action');
  }
};
