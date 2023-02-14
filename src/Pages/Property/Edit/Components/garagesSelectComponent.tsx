import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';



export default function NativeSelectDemo() {
    return (
        <FormControl variant='standard' fullWidth>
            <InputLabel>Garages</InputLabel>
             <Select
                defaultValue="1"
                name="garage"
                label="Garages"
                >
                {
                    [...Array.from(Array(11).keys()).map(n => n)]
                    .map(number => <MenuItem key={number} value={number}>{number}</MenuItem>)
                }
            </Select>
        </FormControl>
    );
  }
