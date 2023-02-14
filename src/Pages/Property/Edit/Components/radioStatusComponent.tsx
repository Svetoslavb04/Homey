import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup() {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="status"
      >
        <FormControlLabel value="for_sale" control={<Radio />} label="for sale" />
        <FormControlLabel value="for_rent" control={<Radio />} label="for rent" />
      </RadioGroup>
    </FormControl>
  );
};