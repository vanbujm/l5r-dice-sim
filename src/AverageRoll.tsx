import React from 'react';
import { Box, Divider, LinearProgress, Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ResultTable } from './ResultTable';
import { useRollWorkerWithReducer } from './useRollWorkerWithReducer';
import { CalculateChanceForm } from './CalculateChancesForm';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Heading } from './components/Heading';

export const AverageRoll = () => {
  const { state, handlers } = useRollWorkerWithReducer();

  const CancelButton = state.loading ? (
    <Button
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
    <Card style={{ marginTop: '1rem' }}>
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
      <Heading type="h3" component="h2">
        Calculate Chances
      </Heading>
      <CalculateChanceForm state={state} handlers={handlers} />
      <Button color="primary" onClick={handlers.requestCalcHandler}>
        Simulate
      </Button>
      {CancelButton}
      {ClearButton}
      {LoadingBar}
      {Results}
    </Card>
  );
};
