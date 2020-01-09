import React, { Reducer, useEffect, useMemo, useReducer } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  Snackbar,
  Typography
} from '@material-ui/core';
import styled from 'styled-components';
import { ProbabilityResult } from './rollSimulator';
import { Alert, AlertTitle } from '@material-ui/lab';
import { AppTextField } from './AppTextField';
import worker from './ComponentWorkerShim';
import { WORKER_TYPE } from './workerTypes';

const InputSection = styled(Box)`
  margin: 1rem 0;
`;

const UPDATE_SKILL_DICE = 'updateSkillDice';
const UPDATE_RING_DICE = 'updateRingDice';
const UPDATE_MAX_STRIFE = 'updateMaxStrife';
const UPDATE_TN = 'updateTargetNumber';
const UPDATE_TO = 'updateTargetOpportunity';
const REQUEST_CALCULATION = 'requestCalculation';
const UPDATE_CALC_PROGRESS = 'updateCalcProgress';
const SIMULATION_COMPLETE = 'simulationComplete';
const CLEAR = 'clear';

type ActionType =
  | 'updateSkillDice'
  | 'updateRingDice'
  | 'updateMaxStrife'
  | 'simulate'
  | 'requestCalculation'
  | 'updateCalcProgress'
  | 'clear'
  | 'updateTargetNumber'
  | 'simulationComplete'
  | 'updateTargetOpportunity';

interface SimulationState {
  skillDice: number;
  ringDice: number;
  maxStrife: number;
  to: number;
  tn: number;
  result: ProbabilityResult | null | undefined;
  loading: boolean;
  progress: number;
  requestCalc: boolean;
}

interface SimulationAction {
  type: ActionType;
  payload?: number;
}

const initialState: SimulationState = {
  skillDice: 0,
  ringDice: 0,
  maxStrife: Infinity,
  tn: 0,
  to: 0,
  result: undefined,
  loading: false,
  requestCalc: false,
  progress: 0
};

const noPayloadError = new Error('Missing payload');

// @ts-ignore
const reducer: Reducer<SimulationState, SimulationAction> = (state, action) => {
  const noPayload = action.payload === undefined;
  switch (action.type) {
    case UPDATE_SKILL_DICE:
      if (noPayload) throw noPayloadError;
      return { ...state, skillDice: action.payload };
    case UPDATE_RING_DICE:
      if (noPayload) throw noPayloadError;
      return { ...state, ringDice: action.payload };
    case UPDATE_MAX_STRIFE:
      if (noPayload) throw noPayloadError;
      return { ...state, maxStrife: action.payload };
    case UPDATE_TN:
      if (noPayload) throw noPayloadError;
      return { ...state, tn: action.payload };
    case UPDATE_TO:
      if (noPayload) throw noPayloadError;
      return { ...state, to: action.payload };
    case REQUEST_CALCULATION:
      return { ...state, requestCalc: true, loading: true };
    case UPDATE_CALC_PROGRESS:
      if (noPayload) throw noPayloadError;
      return { ...state, progress: action.payload };
    case SIMULATION_COMPLETE:
      if (noPayload) throw noPayloadError;
      return {
        ...state,
        requestCalc: false,
        loading: false,
        progress: 0,
        result: action.payload
      };
    case CLEAR:
      return { ...initialState };
    default:
      throw new Error('Unknown action');
  }
};

const inputHandler = (e: any) => {
  return e.target.value;
};

const createWorker = () => worker();

export const AverageRoll = () => {
  const worker = useMemo(createWorker, [createWorker]);

  const initialStateWithWorker = { ...initialState };

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
      progress
    },
    dispatch
  ] = useReducer(reducer, initialStateWithWorker);

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

    return () => {
      // Clean up the subscription
    };
  }, [worker]);

  useEffect(() => {
    if (!requestCalc) return;

    const calculateProbability = async () => {
      const data = await worker.calculateProbability({
        ringDice: Number(ringDice),
        skillDice: Number(skillDice),
        maxStrife: Number(maxStrife),
        tn: Number(tn),
        to: Number(to)
      });

      dispatch({ type: SIMULATION_COMPLETE, payload: data });
    };

    calculateProbability();

    return () => {
      // Clean up the subscription
    };
  }, [maxStrife, requestCalc, ringDice, skillDice, tn, to, worker]);

  return (
    <Card style={{ marginTop: '1rem' }}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={result === null}
        onClose={() => dispatch({ type: CLEAR })}
        message="Simulation too difficult"
      >
        <Alert
          severity="error"
          variant="filled"
          style={{ backgroundColor: '#E5170B' }}
        >
          <AlertTitle>Simulation too difficult!</AlertTitle>
          Try again with smaller numbers.
        </Alert>
      </Snackbar>
      <CardContent>
        <Typography variant="h5" component="h1">
          Calculate Chances
        </Typography>
        <InputSection>
          <AppTextField
            id="average-skill-dice"
            label="Skill Dice"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            value={skillDice}
            onChange={(e: any) =>
              dispatch({ type: UPDATE_SKILL_DICE, payload: inputHandler(e) })
            }
          />
          <AppTextField
            id="ring-dice"
            label="Ring Dice"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            value={ringDice}
            onChange={(e: any) =>
              dispatch({ type: UPDATE_RING_DICE, payload: inputHandler(e) })
            }
          />
        </InputSection>
        <InputSection>
          <AppTextField
            id="average-target-number"
            label="Target Success"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            value={tn}
            onChange={(e: any) =>
              dispatch({ type: UPDATE_TN, payload: inputHandler(e) })
            }
          />
          <AppTextField
            id="target-opportunity"
            label="Target Opportunity"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            value={to}
            onChange={(e: any) =>
              dispatch({ type: UPDATE_TO, payload: inputHandler(e) })
            }
          />
        </InputSection>
        <InputSection>
          <AppTextField
            id="maximum-strife"
            label="Maximum Strife"
            type="text"
            InputLabelProps={{
              shrink: true
            }}
            value={maxStrife}
            onChange={(e: any) =>
              dispatch({ type: UPDATE_MAX_STRIFE, payload: inputHandler(e) })
            }
          />
        </InputSection>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch({ type: REQUEST_CALCULATION })}
        >
          Simulate
        </Button>
        {result != null ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch({ type: CLEAR })}
            style={{ marginLeft: '1rem' }}
          >
            Clear
          </Button>
        ) : null}
        {loading === true ? (
          <Box style={{ margin: '1rem 0' }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              color="secondary"
            />
          </Box>
        ) : null}
        {result != null ? (
          <Box style={{ marginTop: '1rem' }}>
            <Divider />
            <Box style={{ marginTop: '1rem' }}>
              <Typography variant="body1">
                Success chance: {(result.probability * 100).toFixed(2)}%
              </Typography>
              <Typography variant="body1">
                Average strife: {result.averageStrife.toFixed(2)}
              </Typography>
              <Typography variant="body2">
                Sample Size:{' '}
                {new Intl.NumberFormat('en').format(
                  Math.round(result.sampleSize)
                )}
              </Typography>
            </Box>
          </Box>
        ) : null}
      </CardContent>
    </Card>
  );
};
