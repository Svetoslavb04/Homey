import './PropertyFilter.scss';
import { FC, useState, useEffect, HTMLAttributes, DetailedHTMLProps } from 'react'

import CountrySelect from '../CountrySelect';

import { PropertyType } from '../../../enums/PropertyType';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';

export type PropertyFilterProps = {

} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const PropertyFilter: FC<PropertyFilterProps> = ({ className, ...rest }) => {

  const [selectedCountry, setSelectedCountry] = useState<string>('BG');
  const handleCountryChange = (e: SelectChangeEvent<string>) => setSelectedCountry(e.target.value)

  const [selectedType, setSelectedType] = useState<PropertyType | 'Any'>('Any');
  const handleTypeChange = (e: SelectChangeEvent<string>) => {

    const value = e.target.value

    if (value in PropertyType || value === 'Any') {
      setSelectedType(value as PropertyType | 'Any')
    }

  }

  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);

  const handleChange = (e: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  useEffect(() => {

    fetch('http://ip-api.com/json')
      .then(res => res.json())
      .then(payload => { setSelectedCountry(payload.countryCode) })

  }, [])

  return (
    <div {...rest} className={`property-filter${className ? ` ${className}` : ''}`}>
      <div className='property-filter-basic'>
        <div className='property-filter-basic-item'>
          <CountrySelect
            className='property-filter-country-select'
            label='Country'
            value={selectedCountry}
            onChange={handleCountryChange}
          />
        </div>
        <div className='property-filter-basic-item'>
          <FormControl variant='standard' fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              value={selectedType}
              label="Type"
              onChange={handleTypeChange}
            >
              {
                [...Object.values(PropertyType), 'Any']
                  .map(type =>
                    <MenuItem key={type} value={type}>{
                      type.charAt(0).toUpperCase() + type.slice(1)
                    }</MenuItem>
                  )
              }
            </Select>
          </FormControl>
        </div>
        <div className='property-filter-basic-item'>
          <p className='property-filter-price-label'>Price: {priceRange[0]} - {priceRange[1]}</p>
          <Slider
            size="small"
            getAriaLabel={() => 'Price range'}
            value={priceRange}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0} //Should get from server
            max={100000} //Should get from server
          />
        </div>
        <div className='property-filter-basic-item'>
          <Button fullWidth variant="contained">Search Property</Button>
        </div>
      </div>
    </div>
  )
}

export default PropertyFilter