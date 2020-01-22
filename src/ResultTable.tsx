import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@material-ui/core';
import { lighten, mix } from 'polished';
import React, { useContext } from 'react';
import { ProbabilityResult } from './rollSimulator';
import { theme } from './design-system/theme';
import { ThemeContext } from 'styled-components';

const formatter = new Intl.NumberFormat(window.navigator.language);

interface ResultTableProps {
  result: ProbabilityResult;
}

const useTableStyles = makeStyles({
  row: {
    backgroundColor: theme.color.light,
    color: theme.color.dark,
    fontFamily: theme.fonts.text
  },
  cell: {
    fontFamily: theme.fonts.text
  }
});

export const ResultTable: React.FC<ResultTableProps> = ({ result }) => {
  const theme = useContext(ThemeContext);
  const tableClasses = useTableStyles();
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableBody>
          <TableRow classes={{ root: tableClasses.row }} hover>
            <TableCell
              classes={{ root: tableClasses.cell }}
              component="th"
              scope="row"
            >
              <span style={{ fontSize: '1.25rem' }}>Chance of success</span>
            </TableCell>
            <TableCell classes={{ root: tableClasses.cell }} align="right">
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  color: mix(
                    result.probability,
                    theme.color.success,
                    theme.color.important
                  )
                }}
              >
                {(result.probability * 100).toFixed(2)}%
              </span>
            </TableCell>
          </TableRow>
          <TableRow hover classes={{ root: tableClasses.row }}>
            <TableCell
              classes={{ root: tableClasses.cell }}
              component="th"
              scope="row"
            >
              Average strife
            </TableCell>
            <TableCell classes={{ root: tableClasses.cell }} align="right">
              {result.averageStrife.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow hover classes={{ root: tableClasses.row }}>
            <TableCell
              classes={{ root: tableClasses.cell }}
              component="th"
              scope="row"
            >
              Average successes
            </TableCell>
            <TableCell classes={{ root: tableClasses.cell }} align="right">
              {result.averageSuccess.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow hover classes={{ root: tableClasses.row }}>
            <TableCell
              classes={{ root: tableClasses.cell }}
              component="th"
              scope="row"
            >
              Average opportunity
            </TableCell>
            <TableCell classes={{ root: tableClasses.cell }} align="right">
              {result.averageOpportunity.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow hover classes={{ root: tableClasses.row }}>
            <TableCell
              classes={{ root: tableClasses.cell }}
              component="th"
              scope="row"
            >
              Average explosions
            </TableCell>
            <TableCell classes={{ root: tableClasses.cell }} align="right">
              {result.averageExplosions.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow hover classes={{ root: tableClasses.row }}>
            <TableCell
              classes={{ root: tableClasses.cell }}
              component="th"
              scope="row"
            >
              Number of keep combination per roll
            </TableCell>
            <TableCell classes={{ root: tableClasses.cell }} align="right">
              {formatter.format(result.combinationsPerRoll)}
            </TableCell>
          </TableRow>
          <TableRow hover classes={{ root: tableClasses.row }}>
            <TableCell
              classes={{ root: tableClasses.cell }}
              component="th"
              scope="row"
            >
              Sample Size
            </TableCell>
            <TableCell classes={{ root: tableClasses.cell }} align="right">
              {formatter.format(Math.round(result.sampleSize))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
