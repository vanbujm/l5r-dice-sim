import React, { Reducer, useReducer } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Snackbar,
  Typography
} from '@material-ui/core';
import styled from 'styled-components';
import { calculateProbability, ProbabilityResult } from './rollSimulator';
import { Alert, AlertTitle } from '@material-ui/lab';
import { AppTextField } from './AppTextField';

const InputSection = styled(Box)`
  margin: 1rem 0;
`;

const UPDATE_SKILL_DICE = 'updateSkillDice';
const UPDATE_RING_DICE = 'updateRingDice';
const UPDATE_MAX_STRIFE = 'updateMaxStrife';
const UPDATE_TN = 'updateTargetNumber';
const UPDATE_TO = 'updateTargetOpportunity';
const SIMULATE = 'simulate';
const CLEAR = 'clear';

type ActionType =
  | 'updateSkillDice'
  | 'updateRingDice'
  | 'updateMaxStrife'
  | 'simulate'
  | 'clear'
  | 'updateTargetNumber'
  | 'updateTargetOpportunity';

interface SimulationState {
  skillDice: number;
  ringDice: number;
  maxStrife: number;
  to: number;
  tn: number;
  result: ProbabilityResult | null | undefined;
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
  result: undefined
};

const reducer: Reducer<SimulationState, SimulationAction> = (state, action) => {
  switch (action.type) {
    case UPDATE_SKILL_DICE:
      if (action.payload === undefined) throw new Error('Missing payload');
      return { ...state, skillDice: action.payload };
    case UPDATE_RING_DICE:
      if (action.payload === undefined) throw new Error('Missing payload');
      return { ...state, ringDice: action.payload };
    case UPDATE_MAX_STRIFE:
      if (action.payload === undefined) throw new Error('Missing payload');
      return { ...state, maxStrife: action.payload };
    case UPDATE_TN:
      if (action.payload === undefined) throw new Error('Missing payload');
      return { ...state, tn: action.payload };
    case UPDATE_TO:
      if (action.payload === undefined) throw new Error('Missing payload');
      return { ...state, to: action.payload };
    case SIMULATE:
      return {
        ...state,
        result: calculateProbability({
          ringDice: Number(state.ringDice),
          skillDice: Number(state.skillDice),
          maxStrife: Number(state.maxStrife),
          tn: Number(state.tn),
          to: Number(state.to)
        })
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

export const AverageRoll = () => {
  const [
    { skillDice, ringDice, result, tn, to, maxStrife },
    dispatch
  ] = useReducer(reducer, initialState);

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
          Calculate chances
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
          onClick={() => dispatch({ type: SIMULATE })}
        >
          Simulate
        </Button>
        {result != null ? (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch({ type: CLEAR })}
              style={{ marginLeft: '1rem' }}
            >
              Clear
            </Button>
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
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};
