import React, {
  Dispatch,
  Reducer,
  useReducer
} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Tooltip,
  Typography
} from '@material-ui/core';
import styled from 'styled-components';
import { rollDice, RollResult } from './rollSimulator';
import { AppTextField } from './AppTextField';

const InputSection = styled(Box)`
  margin: 1rem 0;
`;

const HoverableContainer = styled(Box)`
  margin: 0.25rem 0;
  padding: 0.75rem 0.25rem;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 2px inset black;
    border-radius: 0.25rem;
  }
`;

const UPDATE_SKILL_DICE = 'updateSkillDice';
const UPDATE_RING_DICE = 'updateRingDice';
const RE_ROLL_DIE = 'rerollDie';
const SIMULATE = 'simulate';
const CLEAR = 'clear';

type ActionType =
  | 'updateSkillDice'
  | 'updateRingDice'
  | 'simulate'
  | 'clear'
  | 'rerollDie';

interface SimulationState {
  skillDice: number;
  ringDice: number;
  result: any | null;
}

interface SimulationAction {
  type: ActionType;
  payload?: any;
}

const initialState: SimulationState = {
  skillDice: 0,
  ringDice: 0,
  result: null
};

const simulateRoll = (skillDice: number, ringDice: number) => {
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
    case RE_ROLL_DIE:
      if (action.payload === undefined) throw new Error('Missing payload');
      if (state.result === null) return state;
      const { type, index } = action.payload;
      const { result } = state;
      const cloneResult = { ...result };
      const newRoll =
        type === 'skillDices'
          ? rollDice(0, 1).skillDices[0]
          : rollDice(1, 0).ringDices[0];
      cloneResult[type].splice(index, 1, newRoll);
      return { ...state, result: cloneResult };
    case CLEAR:
      return { ...state, result: null };
    default:
      throw new Error('Unknown action');
  }
};

const inputHandler = (e: any) => {
  return e.target.value;
};

export interface ResultsProps {
  skillDices: any;
  ringDices: any;
  dispatch: Dispatch<any>;
}

const FormattedRoll = ({ roll: { image } }: { roll: RollResult }) => (
  <img
    src={`dice/${image}`}
    alt="l5r dice"
    style={{ width: '3rem', height: '3rem', margin: '0 0.25rem' }}
  />
);

const rollResultMapper = (type: string, dispatch: Dispatch<any>) => (
  rollArr: RollResult[][],
  index: number
) => {
  return (
    <Tooltip
      title="Re-roll"
      aria-label="re-roll"
      placement="right"
      key={`${type}${index + 1}`}
    >
      <HoverableContainer
        onClick={() =>
          dispatch({ type: RE_ROLL_DIE, payload: { type, index } })
        }
      >
        {rollArr.map((roll: RollResult[], index2) => (
          <FormattedRoll roll={roll as any} key={`roll${index}:${index2}`} />
        ))}
      </HoverableContainer>
    </Tooltip>
  );
};

export const Results: React.FC<ResultsProps> = ({
  skillDices,
  ringDices,
  dispatch
}) => {
  const FormattedSkillDice = skillDices.map(
    rollResultMapper('skillDices', dispatch)
  );
  const FormattedRingDice = ringDices.map(
    rollResultMapper('ringDices', dispatch)
  );

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
          <AppTextField
            id="simulate-skill-dice"
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
            id="simulate-ring-dice"
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
              <Results {...(result as ResultsProps)} dispatch={dispatch} />
            </Box>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};
