import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  useTheme
} from '@material-ui/core';
import { lighten, mix } from 'polished';
import React from 'react';
import { ProbabilityResult } from './rollSimulator';

const formatter = new Intl.NumberFormat(window.navigator.language);

interface ResultTableProps {
  result: ProbabilityResult;
}

export const ResultTable: React.FC<ResultTableProps> = ({ result }) => {
  const theme = useTheme();
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableBody>
          <TableRow hover>
            <TableCell component="th" scope="row">
              <span style={{ fontSize: '1.25rem' }}>Chance of success</span>
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
  );
};
