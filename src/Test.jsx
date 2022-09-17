import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const Test = () => {
  const [accordion, setAccordion] = useState('');

  return (
    <div>
      <Box>
        <Accordion
          expanded={accordion === 'test1'}
          onChange={() => setAccordion('test1')}
        >
          <AccordionSummary expandIcon={'>'}>
            <Typography>Test 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>My name is Dong Hun, Kim</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={accordion === 'test2'}
          onChange={() => setAccordion('test2')}
        >
          <AccordionSummary expandIcon={'>'}>
            <Typography>Test 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>My name is Dong Hun, Kim</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
};
export default Test;
