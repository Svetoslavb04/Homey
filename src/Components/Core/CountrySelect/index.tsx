import './CountrySelect.scss';
import { FC } from 'react';

import { countries } from '../../../assets/js/countries';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type CountrySelectProps = {
    className?: string,
    label: string,
    value: string,
    onChange: (e: SelectChangeEvent<string>) => void,
    hasValueAny?: boolean
}

const CountrySelect: FC<CountrySelectProps> = ({ className, label, value, onChange, hasValueAny = true }) => {
    return (
        <FormControl fullWidth variant='standard' className={`country-select${className ? ` ${className}` : ''}`}>
            <InputLabel className="country-select-label">{label}</InputLabel>
            <Select
                label={label}
                MenuProps={{ classes: { paper: 'country-select-countries-list' } }}
                value={value}
                onChange={onChange}
            >
                {
                    hasValueAny && <MenuItem
                        key={'any'}
                        value={'any'}
                    >
                        <div className='country-select-item'>
                            <span className='country-select-name'>Any</span>
                        </div>
                    </MenuItem>
                }
                {
                    countries?.map(country =>
                        <MenuItem
                            key={country.name}
                            value={country.name}
                        >
                            <div className='country-select-item'>
                                <span className='country-select-flag-container'>
                                    <img
                                        loading="lazy"
                                        src={`https://flagcdn.com/w320/${country.code.toLowerCase()}.png`}
                                        alt="flag"
                                    />
                                    <span className='country-select-name'>{country.name}</span>
                                </span>
                            </div>
                        </MenuItem>
                    )
                }
            </Select>
        </FormControl>
    )
}

export default CountrySelect