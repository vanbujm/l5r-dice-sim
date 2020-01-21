import {
  Box,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormGroup,
  Grid
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { SimulationState } from './rollReducer';
import { Input } from './components/Input';
import { Heading } from './components/Heading';
import { Checkbox } from './components/Checkbox';

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
        <Input
          id="average-skill-dice"
          label="Skill Dice"
          type="number"
          value={skillDice}
          onChange={updateSkillDiceHandler}
        />
        <Input
          id="ring-dice"
          label="Ring Dice"
          type="number"
          value={ringDice}
          onChange={updateRingDiceHandler}
        />
      </InputSection>
      <InputSection>
        <Input
          id="average-target-number"
          label="Target Success"
          type="number"
          value={tn}
          onChange={updateTnHandler}
        />
        <Input
          id="target-opportunity"
          label="Target Opportunity"
          type="number"
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
            <Heading type="h6" component="h3">Advanced Options</Heading>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Input
                  id="maximum-strife"
                  label="Maximum Strife"
                  type="text"
                  value={maxStrife}
                  onChange={updateMaxStrifeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup row>
                  <Checkbox
                    id="Skilled Assist"
                    label="Skilled Assist"
                    checked={skilledAssist}
                    onChange={updateSkilledAssistHandler}
                  />
                  <Checkbox
                    id="UnSkilledAssist"
                    label="UnSkilledAssist"
                    checked={unskilledAssist}
                    onChange={updateUnskilledAssistHandler}
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
