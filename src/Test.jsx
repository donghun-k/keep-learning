import { Autocomplete, TextField } from '@mui/material';
import { Box } from '@mui/system';

let movie = [
  'Scarface',
  'Once Upon A Time In America',
  'Blade Runner',
  'Godfather',
];

const Test = () => {
  return (
    <div>
      <Box>
        <Autocomplete
          sx={{ width: 300 }}
          options={movie}
          renderInput={(params) => (
            <TextField {...params} label='List of Movie' />
          )}
        />
      </Box>
    </div>
  );
};
export default Test;
