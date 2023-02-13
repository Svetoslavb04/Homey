import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';



export default function NativeSelectDemo() {
    return (
        <FormControl variant='standard' fullWidth>
            <InputLabel>Bathrooms</InputLabel>
             <Select
                defaultValue="1"
                name="batrooms"
                label="Bathrooms"
                >
                {
                    [...Array.from(Array(10).keys()).map(n => ++n)]
                    .map(number => <MenuItem key={number} value={number}>{number}</MenuItem>)
                }
            </Select>
        </FormControl>
    );
  }
