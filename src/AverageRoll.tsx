import React from 'react';
import {
  Box,
  Divider,
  LinearProgress,
  makeStyles,
  Snackbar
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ResultTable } from './ResultTable';
import { useRollWorkerWithReducer } from './useRollWorkerWithReducer';
import { CalculateChanceForm } from './CalculateChancesForm';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Heading } from './components/Heading';
import { theme } from './design-system/theme';

const useLoadingBarStyles = makeStyles({
  colorPrimary: { backgroundColor: theme.color.light },
  barColorPrimary: { backgroundColor: theme.color.primary }
});

export const AverageRoll = () => {
  const { state, handlers } = useRollWorkerWithReducer();

  const loadingBarClasses = useLoadingBarStyles();

  const CancelButton = state.loading ? (
    <Button
      color="important"
      onClick={handlers.cancelHandler}
      style={{ marginLeft: '1rem' }}
    >
      Cancel
    </Button>
  ) : null;

  const ClearButton =
    state.result != null ? (
      <Button
        color="important"
        onClick={handlers.clearHandler}
        style={{ marginLeft: '1rem' }}
      >
        Clear
      </Button>
    ) : null;

  const LoadingBar = state.loading ? (
    <Box style={{ margin: '1rem 0.5rem 0 0.5rem' }}>
      <LinearProgress
        classes={{
          colorPrimary: loadingBarClasses.colorPrimary,
          barColorPrimary: loadingBarClasses.barColorPrimary
        }}
        variant="determinate"
        value={Number(state.progress) || 0}
        color="primary"
      />
    </Box>
  ) : null;

  const Results = state.result ? (
    <Box style={{ marginTop: '1rem' }}>
      <Divider style={{ margin: ' 0 0.5rem' }} />
      <Box style={{ margin: '1rem 0.5rem 0 0.5rem' }}>
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
      <Heading type="h3" component="h2" style={{ margin: '0 0.5rem' }}>
        Calculate Chances
      </Heading>
      <CalculateChanceForm state={state} handlers={handlers} />
      <Button color="secondary" onClick={handlers.requestCalcHandler}>
        Simulate
      </Button>
      {CancelButton}
      {ClearButton}
      {LoadingBar}
      {Results}
    </Card>
  );
};
