import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';

export default function NativeSelectDemo() {
  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl fullWidth variant="standard">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Type
        </InputLabel>
        <Select
          name='type'
          defaultValue="house"
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