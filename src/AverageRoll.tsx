import React, { Reducer, useEffect, useReducer } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  FormGroup,
  Grid,
  LinearProgress,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme
} from '@material-ui/core';
import styled from 'styled-components';
import { ProbabilityResult } from './rollSimulator';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ExpandMore } from '@material-ui/icons';
import { AppTextField } from './AppTextField';
import { useRollWorker } from './useRollWorker';
import { WORKER_TYPE } from './workerTypes';
import { lighten, mix } from 'polished';

const InputSection = styled(Box)`
  margin: 1rem 0;
`;

const UPDATE_SKILL_DICE = 'updateSkillDice';
const UPDATE_RING_DICE = 'updateRingDice';
const UPDATE_MAX_STRIFE = 'updateMaxStrife';
const UPDATE_SKILLED_ASSIST = 'updateSkilledAssist';
const UPDATE_UNSKILLED_ASSIST = 'updateUnskilledAssist';
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
  | 'updateSkilledAssist'
  | 'updateUnskilledAssist'
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
  skilledAssist: boolean;
  unskilledAssist: boolean;
  to: number;
  tn: number;
  result: ProbabilityResult | null | undefined;
  loading: boolean;
  progress: number;
  requestCalc: boolean;
}

interface SimulationAction {
  type: ActionType;
  payload?: number | boolean;
}

const initialState: SimulationState = {
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
    case UPDATE_SKILLED_ASSIST:
      if (noPayload) throw noPayloadError;
      return { ...state, skilledAssist: action.payload };
    case UPDATE_UNSKILLED_ASSIST:
      if (noPayload) throw noPayloadError;
      return { ...state, unskilledAssist: action.payload };
    case UPDATE_TN:
      if (noPayload) throw noPayloadError;
      return { ...state, tn: action.payload };
    case UPDATE_TO:
      if (noPayload) throw noPayloadError;
      return { ...state, to: action.payload };
    case REQUEST_CALCULATION:
      return { ...state, requestCalc: true, loading: true, result: undefined };
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

const formatter = new Intl.NumberFormat(window.navigator.language);

export const AverageRoll = () => {
  const theme = useTheme();

  const worker = useRollWorker();

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
      skilledAssist,
      unskilledAssist,
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

    return () => {};
  }, [worker]);

  useEffect(() => {
    if (!requestCalc) return;

    const calculateProbability = async () => {
      const keep =
        Number(ringDice) + (skilledAssist ? 1 : 0) + (unskilledAssist ? 1 : 0);
      const finalRingDice = Number(ringDice) + (unskilledAssist ? 1 : 0);
      const finalSkillDice = Number(skillDice) + (skilledAssist ? 1 : 0);
      const data = await worker.calculateProbability({
        ringDice: finalRingDice,
        skillDice: finalSkillDice,
        maxStrife: Number(maxStrife),
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
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMore />}
              aria-controls="advanced-options-panel1"
              id="advanced-options-panel"
            >
              <Typography>Advanced Options</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <AppTextField
                    id="maximum-strife"
                    label="Maximum Strife"
                    type="text"
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={maxStrife}
                    onChange={(e: any) =>
                      dispatch({
                        type: UPDATE_MAX_STRIFE,
                        payload: inputHandler(e)
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={skilledAssist}
                          onChange={() =>
                            dispatch({
                              type: UPDATE_SKILLED_ASSIST,
                              payload: !skilledAssist
                            })
                          }
                        />
                      }
                      label="Skilled Assist"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={unskilledAssist}
                          onChange={() =>
                            dispatch({
                              type: UPDATE_UNSKILLED_ASSIST,
                              payload: !unskilledAssist
                            })
                          }
                        />
                      }
                      label="UnSkilledAssist"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
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
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableBody>
                    <TableRow hover>
                      <TableCell component="th" scope="row">
                        <span style={{ fontSize: '1.25rem' }}>
                          Chance of success
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span
                          style={{
                            fontWeight: 'bold',
                            fontSize: '1.25rem',
                            color: lighten(
                              0.1,
                              mix(
                                result.probability,
                                theme.palette.success.main,
                                theme.palette.error.main
                              )
                            )
                          }}
                        >
                          {(result.probability * 100).toFixed(2)}%
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell component="th" scope="row">
                        Average strife
                      </TableCell>
                      <TableCell align="right">
                        {result.averageStrife.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell component="th" scope="row">
                        Average successes
                      </TableCell>
                      <TableCell align="right">
                        {result.averageSuccess.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell component="th" scope="row">
                        Average opportunity
                      </TableCell>
                      <TableCell align="right">
                        {result.averageOpportunity.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell component="th" scope="row">
                        Average explosions
                      </TableCell>
                      <TableCell align="right">
                        {result.averageExplosions.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell component="th" scope="row">
                        Number of keep combination per roll
                      </TableCell>
                      <TableCell align="right">
                        {formatter.format(result.combinationsPerRoll)}
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell component="th" scope="row">
                        Sample Size
                      </TableCell>
                      <TableCell align="right">
                        {formatter.format(Math.round(result.sampleSize))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        ) : null}
      </CardContent>
    </Card>
  );
};
