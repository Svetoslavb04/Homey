import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ChangeEvent } from 'react';
import { PropertyStatus } from '../../../../enums/PropertyStatus';

export default function RowRadioButtonsGroup({ value, onChange }: { value: string, onChange: (newValue: PropertyStatus) => void }) {

  const handleRadioChange = (newValue: string) => {

    if (newValue in PropertyStatus) {
      onChange(newValue as PropertyStatus)
    }
  }

  return (
    <FormControl>
      <FormLabel>Status</FormLabel>
      <RadioGroup
        row
        name="status-radio-group"
        value={value}
      >
        <FormControlLabel value="for_sale" control={<Radio onChange={handleRadioChange.bind(null, 'for_sale')} />} label="for sale" />
        <FormControlLabel value="for_rent" control={<Radio onChange={handleRadioChange.bind(null, 'for_rent')} />} label="for rent" />
      </RadioGroup>
    </FormControl>
  );
};