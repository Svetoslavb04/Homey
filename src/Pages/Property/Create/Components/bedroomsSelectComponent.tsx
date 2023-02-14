import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';

export default function Bedrooms({ value, onChange }: { value: string, onChange(e: SelectChangeEvent): void }) {
    return (
        <FormControl variant='standard' fullWidth>
            <InputLabel>Bedrooms</InputLabel>
             <Select
                value={value}
                onChange={onChange}
                name="bedrooms"
                label="Bedrooms"
                >
                {
                    [...Array.from(Array(11).keys()).map(n => n)]
                    .map(number => <MenuItem key={number} value={number}>{number}</MenuItem>)
                }
            </Select>
        </FormControl>
    );
  }

