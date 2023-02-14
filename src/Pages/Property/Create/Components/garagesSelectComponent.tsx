import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';

export default function Garages({ value, onChange }: { value: string, onChange(e: SelectChangeEvent): void }) {
    return (
        <FormControl variant='standard' fullWidth>
            <InputLabel>Garages</InputLabel>
             <Select
                value={value}
                onChange={onChange}
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
