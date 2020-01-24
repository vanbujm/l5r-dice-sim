import { Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { SimulationState } from './rollReducer';
import { Input } from './components/Input';
import { Checkbox } from './components/Checkbox';
import { Accordion, AccordionItem } from './components/Accordion';
import { Button } from './components/Button';

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

const InfinityButton = styled(Button)`
  margin: 0;
  padding: 0 0.5rem;
  box-sizing: border-box;

  &::before,
  &::after {
    content: none;
  }
`;

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
  const themeContext = useContext(ThemeContext);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Input
            id="average-skill-dice"
            label="Skill Dice"
            type="number"
            value={skillDice}
            color="info"
            onChange={updateSkillDiceHandler}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="ring-dice"
            label="Ring Dice"
            type="number"
            value={ringDice}
            color="flair"
            onChange={updateRingDiceHandler}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Input
            id="average-target-number"
            label="Target Success"
            type="number"
            value={tn}
            color="error"
            onChange={updateTnHandler}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="target-opportunity"
            label="Target Opportunity"
            type="number"
            value={to}
            color="success"
            onChange={updateToHandler}
          />
        </Grid>
      </Grid>
      <Accordion style={{ margin: '1rem 0.5rem' }}>
        <AccordionItem label="Advanced Options" color="info" card>
          <Grid container spacing={0}>
            <Grid item xs={12} style={{ paddingBottom: '0' }}>
              <Grid item xs={6}>
                <Input
                  style={{ fontSize: themeContext.sizes.p }}
                  id="maximum-strife"
                  label="Maximum Strife"
                  value={maxStrife}
                  color="important"
                  onChange={updateMaxStrifeHandler}
                  aside={
                    <InfinityButton
                      onClick={() =>
                        updateMaxStrifeHandler({
                          target: { value: 'Infinity' }
                        })
                      }
                      color="important"
                    >
                      ∞
                    </InfinityButton>
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Checkbox
                style={{ fontSize: themeContext.sizes.p }}
                id="Skilled Assist"
                label="Skilled Assist"
                checked={skilledAssist}
                onChange={updateSkilledAssistHandler}
                color="success"
              />
            </Grid>
            <Grid item xs={6}>
              <Checkbox
                style={{ fontSize: themeContext.sizes.p }}
                id="UnSkilledAssist"
                label="UnSkilled Assist"
                checked={unskilledAssist}
                onChange={updateUnskilledAssistHandler}
                color="error"
              />
            </Grid>
          </Grid>
        </AccordionItem>
      </Accordion>
    </>
  );
};
