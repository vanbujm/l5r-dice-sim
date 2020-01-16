import React from 'react';
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
import { Alert, AlertTitle } from '@material-ui/lab';
import { ResultTable } from './ResultTable';
import { useRollWorkerWithReducer } from './useRollWorkerWithReducer';
import { CalculateChanceForm } from './CalculateChancesForm';

export const AverageRoll = () => {
  const { state, handlers } = useRollWorkerWithReducer();

  const CancelButton = state.loading ? (
    <Button
      variant="contained"
      color="secondary"
      onClick={handlers.cancelHandler}
      style={{ marginLeft: '1rem' }}
    >
      Cancel
    </Button>
  ) : null;

  const ClearButton =
    state.result != null ? (
      <Button
        variant="contained"
        color="secondary"
        onClick={handlers.clearHandler}
        style={{ marginLeft: '1rem' }}
      >
        Clear
      </Button>
    ) : null;

  const LoadingBar = state.loading ? (
    <Box style={{ margin: '1rem 0' }}>
      <LinearProgress
        variant="determinate"
        value={Number(state.progress) || 0}
        color="secondary"
      />
    </Box>
  ) : null;

  const Results = state.result ? (
    <Box style={{ marginTop: '1rem' }}>
      <Divider />
      <Box style={{ marginTop: '1rem' }}>
        <ResultTable result={state.result} />
      </Box>
    </Box>
  ) : null;

  return (
    <Card style={{ marginTop: '1rem' }} component="section">
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={state.result === null}
        onClose={handlers.clearHandler}
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
        <CalculateChanceForm state={state} handlers={handlers} />
        <Button
          variant="contained"
          color="primary"
          onClick={handlers.requestCalcHandler}
        >
          Simulate
        </Button>
        {CancelButton}
        {ClearButton}
        {LoadingBar}
        {Results}
      </CardContent>
    </Card>
  );
};
