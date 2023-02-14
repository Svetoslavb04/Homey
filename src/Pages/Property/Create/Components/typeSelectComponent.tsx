import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';

export default function NativeSelectDemo({ value, onChange }: { value: string, onChange: (e: SelectChangeEvent) => void }) {
  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl fullWidth variant="standard">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Type
        </InputLabel>
        <Select
          name='type'
          value={value}
          onChange={onChange}
          label="Type"
        >
          <MenuItem value={'house'}>House</MenuItem>
          <MenuItem value={'apartment'}>Apartment</MenuItem>
          <MenuItem value={'villa'}>Villa</MenuItem>
          <MenuItem value={'landfield'}>Landfield</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}