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
import { rollDice, RollResult } from './rollSimulator';

const InputSection = styled(Box)`
  margin: 1rem 0;
`;

const UPDATE_SKILL_DICE = 'updateSkillDice';
const UPDATE_RING_DICE = 'updateRingDice';
const SIMULATE = 'simulate';
const CLEAR = 'clear';

type ActionType = 'updateSkillDice' | 'updateRingDice' | 'simulate' | 'clear';

interface Result {}

interface SimulationState {
  skillDice: number;
  ringDice: number;
  result: Result | null;
}

interface SimulationAction {
  type: ActionType;
  payload?: number;
}

const initialState: SimulationState = {
  skillDice: 0,
  ringDice: 0,
  result: null
};

const simulateRoll = (skillDice: number, ringDice: number): Result => {
  return rollDice(skillDice, ringDice);
};

const reducer: Reducer<SimulationState, SimulationAction> = (state, action) => {
  switch (action.type) {
    case UPDATE_SKILL_DICE:
      if (action.payload === undefined) throw new Error('Missing payload');
      return { ...state, skillDice: action.payload };
    case UPDATE_RING_DICE:
      if (action.payload === undefined) throw new Error('Missing payload');
      return { ...state, ringDice: action.payload };
    case SIMULATE:
      return {
        ...state,
        result: simulateRoll(Number(state.ringDice), Number(state.skillDice))
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

interface ResultsProps {
  skillDices: any;
  ringDices: any;
}

const FormattedRoll = ({ roll: { image } }: { roll: RollResult }) => (
  <img
    src={`dice/${image}`}
    alt="l5r dice"
    style={{ width: '3rem', height: '3rem', margin: '0 0.25rem' }}
  />
);

const rollResultMapper = (type: string) => (
  rollArr: RollResult[][],
  index: number
) => {
  return (
    <InputSection key={`${type}${index + 1}`}>
      {rollArr.map((roll: RollResult[], index2) => (
        <FormattedRoll roll={roll as any} key={`roll${index}:${index2}`} />
      ))}
    </InputSection>
  );
};

const Results: React.FC<ResultsProps> = ({ skillDices, ringDices }) => {
  const FormattedSkillDice = skillDices.map(rollResultMapper('skillRoll'));
  const FormattedRingDice = ringDices.map(rollResultMapper('ringRoll'));

  return (
    <>
      {FormattedSkillDice}
      {FormattedRingDice}
    </>
  );
};

export const SimulateRoll = () => {
  const [{ skillDice, ringDice, result }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <Card style={{ marginTop: '1rem' }}>
      <CardContent>
        <Typography variant="h5" component="h1">
          Simulate Roll
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
              <Results {...(result as ResultsProps)} />
            </Box>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};
