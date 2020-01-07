import React, { Reducer, useReducer } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography
} from '@material-ui/core';
import styled from 'styled-components';
import { calculateProbability, ProbabilityResult } from './rollSimulator';

const InputSection = styled(Box)`
  margin: 1rem 0;
`;

const UPDATE_SKILL_DICE = 'updateSkillDice';
const UPDATE_RING_DICE = 'updateRingDice';
const UPDATE_TN = 'updateTargetNumber';
const UPDATE_TO = 'updateTargetOpportunity';
const SIMULATE = 'simulate';
const CLEAR = 'clear';

type ActionType =
  | 'updateSkillDice'
  | 'updateRingDice'
  | 'simulate'
  | 'clear'
  | 'updateTargetNumber'
  | 'updateTargetOpportunity';

interface SimulationState {
  skillDice: number;
  ringDice: number;
  to: number;
  tn: number;
  result: ProbabilityResult | null;
}

interface SimulationAction {
  type: ActionType;
  payload?: number;
}

const initialState: SimulationState = {
  skillDice: 0,
  ringDice: 0,
  tn: 0,
  to: 0,
  result: null
};

const reducer: Reducer<SimulationState, SimulationAction> = (state, action) => {
  switch (action.type) {
    case UPDATE_SKILL_DICE:
      if (action.payload === undefined) throw new Error('Missing payload');
      return { ...state, skillDice: action.payload };
    case UPDATE_RING_DICE:
      if (action.payload === undefined) throw new Error('Missing payload');
      return { ...state, ringDice: action.payload };
    case UPDATE_TN:
      if (action.payload === undefined) throw new Error('Missing payload');
      return { ...state, tn: action.payload };
    case UPDATE_TO:
      if (action.payload === undefined) throw new Error('Missing payload');
      return { ...state, to: action.payload };
    case SIMULATE:
      return {
        ...state,
        result: calculateProbability(
          Number(state.ringDice),
          Number(state.skillDice),
          Number(state.tn),
          Number(state.to)
        )
      };
    case CLEAR:
      return { ...state, result: null };
    default:
      throw new Error('Unknown action');
  }
};

const inputHandler = (e: any) => {
  return e.target.value;
};

export const AverageRoll = () => {
  const [{ skillDice, ringDice, result, tn, to }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <Card style={{ marginTop: '1rem' }}>
      <CardContent>
        <Typography variant="h5" component="h1">
          Calculate chances
        </Typography>
        <InputSection>
          <TextField
            id="skill-dice"
            label="Skill Dice"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            value={skillDice}
            onChange={e =>
              dispatch({ type: UPDATE_SKILL_DICE, payload: inputHandler(e) })
            }
          />
          <TextField
            id="ring-dice"
            label="Ring Dice"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            value={ringDice}
            onChange={e =>
              dispatch({ type: UPDATE_RING_DICE, payload: inputHandler(e) })
            }
          />
        </InputSection>
        <InputSection>
          <TextField
            id="target-number"
            label="Target Success"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            value={tn}
            onChange={e =>
              dispatch({ type: UPDATE_TN, payload: inputHandler(e) })
            }
          />
          <TextField
            id="target-opportunity"
            label="Target Opportunity"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            value={to}
            onChange={e =>
              dispatch({ type: UPDATE_TO, payload: inputHandler(e) })
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
        {result !== null ? (
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
              <Typography variant="body1">
                Success chance: {Math.round(result.probability * 100)}%
              </Typography>
              <Typography variant="body1">
                Average strife: {Math.round(result.averageStrife)}
              </Typography>
            </Box>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};
