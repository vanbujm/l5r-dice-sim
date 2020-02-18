import { useRollWorker } from './useRollWorker';
import { Dispatch, useEffect, useReducer } from 'react';
import { WORKER_TYPE } from './workerTypes';
import {
  CANCEL,
  CLEAR,
  initialState,
  reducer,
  REQUEST_CALCULATION,
  RollReducer,
  SIMULATION_COMPLETE,
  SimulationAction,
  SimulationState,
  UPDATE_CALC_PROGRESS,
  UPDATE_IS_CANCELLED,
  UPDATE_MAX_STRIFE,
  UPDATE_RING_DICE,
  UPDATE_SKILL_DICE,
  UPDATE_SKILLED_ASSIST,
  UPDATE_TN,
  UPDATE_TO,
  UPDATE_UNSKILLED_ASSIST
} from './rollReducer';

interface Handlers {
  updateSkillDiceHandler: (e: any) => void;
  updateRingDiceHandler: (e: any) => void;
  updateTnHandler: (e: any) => void;
  updateToHandler: (e: any) => void;
  updateMaxStrifeHandler: (e: any) => void;
  updateSkilledAssistHandler: () => void;
  updateUnskilledAssistHandler: () => void;
  requestCalcHandler: () => void;
  cancelHandler: () => void;
  clearHandler: () => void;
}

interface UseRollWorkerWithReducerReturn {
  state: SimulationState;
  dispatch: Dispatch<SimulationAction>;
  handlers: Handlers;
}

export const useRollWorkerWithReducer = (): UseRollWorkerWithReducerReturn => {
  const [
    {
      skillDice,
      ringDice,
      result,
      tn,
      to,
      maxStrife,
      requestCalc,
      loading,
      skilledAssist,
      unskilledAssist,
      progress,
      isCancelled
    },
    dispatch
  ] = useReducer<RollReducer>(reducer, initialState);
  const worker = useRollWorker(isCancelled);

  useEffect(() => {
    worker.addEventListener(
      'message',
      (e: any) => {
        const {
          data: { type, message }
        } = e;
        if (type !== WORKER_TYPE) return;
        dispatch({
          type: UPDATE_CALC_PROGRESS,
          payload: Math.round(message * 100)
        });
      },
      false
    );

    return () => {};
  }, [worker]);

  useEffect(() => {
    if (!isCancelled) return;
    worker.terminate();
    dispatch({ type: UPDATE_IS_CANCELLED, payload: false });
    return () => {};
  }, [isCancelled, worker]);

  useEffect(() => {
    if (!requestCalc) return;

    const calculateProbability = async () => {
      const keep =
        Number(ringDice) + (skilledAssist ? 1 : 0) + (unskilledAssist ? 1 : 0);
      const finalRingDice = Number(ringDice) + (unskilledAssist ? 1 : 0);
      const finalSkillDice = Number(skillDice) + (skilledAssist ? 1 : 0);

      const formattedMaxStrife = Number.isNaN(Number(maxStrife)) ? Infinity : Number(maxStrife);

      const data = await worker.calculateProbability({
        ringDice: finalRingDice,
        skillDice: finalSkillDice,
        maxStrife: formattedMaxStrife,
        tn: Number(tn),
        to: Number(to),
        keep
      });

      dispatch({ type: SIMULATION_COMPLETE, payload: data });
    };

    calculateProbability();

    return () => {};
  }, [
    maxStrife,
    requestCalc,
    ringDice,
    skillDice,
    skilledAssist,
    tn,
    to,
    unskilledAssist,
    worker
  ]);

  const requestCalcHandler = () => {
    if (loading) {
      dispatch({ type: CANCEL });
    }
    return dispatch({ type: REQUEST_CALCULATION });
  };

  const updateSkillDiceHandler = (e: any) => {
    dispatch({ type: UPDATE_SKILL_DICE, payload: e.target.value });
  };
  const updateRingDiceHandler = (e: any) => {
    dispatch({ type: UPDATE_RING_DICE, payload: e.target.value });
  };
  const updateTnHandler = (e: any) => {
    dispatch({ type: UPDATE_TN, payload: e.target.value });
  };
  const updateToHandler = (e: any) => {
    dispatch({ type: UPDATE_TO, payload: e.target.value });
  };
  const updateMaxStrifeHandler = (e: any) => {
    dispatch({ type: UPDATE_MAX_STRIFE, payload: e.target.value });
  };

  const updateSkilledAssistHandler = () => {
    dispatch({ type: UPDATE_SKILLED_ASSIST, payload: !skilledAssist });
  };
  const updateUnskilledAssistHandler = () => {
    dispatch({ type: UPDATE_UNSKILLED_ASSIST, payload: !unskilledAssist });
  };

  const cancelHandler = () => {
    dispatch({ type: CANCEL });
  };
  const clearHandler = () => {
    dispatch({ type: CLEAR });
  };

  return {
    state: {
      skillDice,
      ringDice,
      result,
      tn,
      to,
      maxStrife,
      requestCalc,
      loading,
      skilledAssist,
      unskilledAssist,
      progress,
      isCancelled
    },
    dispatch,
    handlers: {
      requestCalcHandler,
      updateSkillDiceHandler,
      updateRingDiceHandler,
      updateTnHandler,
      updateToHandler,
      updateMaxStrifeHandler,
      updateSkilledAssistHandler,
      updateUnskilledAssistHandler,
      cancelHandler,
      clearHandler
    }
  };
};
