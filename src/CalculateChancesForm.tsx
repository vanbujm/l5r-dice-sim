import { AppTextField } from './AppTextField';
import {
  Box,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { SimulationState } from './rollReducer';

const InputSection = styled(Box)`
  margin: 1rem 0;
`;

interface Handlers {
  updateSkillDiceHandler: (e: any) => void;
  updateRingDiceHandler: (e: any) => void;
  updateTnHandler: (e: any) => void;
  updateToHandler: (e: any) => void;
  updateMaxStrifeHandler: (e: any) => void;
  updateSkilledAssistHandler: () => void;
  updateUnskilledAssistHandler: () => void;
}

interface CalculateChancesFormProps {
  state: Partial<SimulationState>;
  handlers: Handlers;
}

export const CalculateChanceForm: React.FC<CalculateChancesFormProps> = ({
  state: {
    skillDice,
    ringDice,
    tn,
    to,
    maxStrife,
    skilledAssist,
    unskilledAssist
  },
  handlers: {
    updateSkillDiceHandler,
    updateRingDiceHandler,
    updateTnHandler,
    updateToHandler,
    updateMaxStrifeHandler,
    updateSkilledAssistHandler,
    updateUnskilledAssistHandler
  }
}) => {
  return (
    <>
      <InputSection>
        <AppTextField
          id="average-skill-dice"
          label="Skill Dice"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          value={skillDice}
          onChange={updateSkillDiceHandler}
        />
        <AppTextField
          id="ring-dice"
          label="Ring Dice"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          value={ringDice}
          onChange={updateRingDiceHandler}
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
          onChange={updateTnHandler}
        />
        <AppTextField
          id="target-opportunity"
          label="Target Opportunity"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          value={to}
          onChange={updateToHandler}
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
                  onChange={updateMaxStrifeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={skilledAssist}
                        onChange={updateSkilledAssistHandler}
                      />
                    }
                    label="Skilled Assist"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={unskilledAssist}
                        onChange={updateUnskilledAssistHandler}
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
    </>
  );
};
