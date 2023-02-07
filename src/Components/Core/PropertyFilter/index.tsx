import './PropertyFilter.scss';
import { FC, useState, useEffect, HTMLAttributes, DetailedHTMLProps } from 'react'

import CountrySelect from '../CountrySelect';

import { citiesOfCountryURL } from '../../../assets/js/APIs';

import { PropertyType } from '../../../enums/PropertyType';
import IPropertyFilter from '../../../interfaces/IPropertyFilter';

import { countries } from '../../../assets/js/countries';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export type PropertyFilterProps = {

} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const PropertyFilter: FC<PropertyFilterProps> = ({ className, ...rest }) => {

  const initialPropertyFilter: IPropertyFilter = {
    country: 'BG',
    type: 'Any',
    priceRange: [0, 100000],
    status: 'Any',
    sizeRange: [0, 500],
    city: '',
  }

  const [advancedFilterOpened, setAdvancedFilterOpened] = useState<boolean>(false);

  const [selectedCountry, setSelectedCountry] = useState<string>(initialPropertyFilter.country);
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  useEffect(() => {

    fetch(citiesOfCountryURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ country: countries.filter(c => c.code === selectedCountry)[0].name })
    })
      .then(res => res.json())
      .then(payload => setAvailableCities(payload.data))
      .catch(err => console.log(err))

  }, [selectedCountry])

  useEffect(() => {

    fetch('http://ip-api.com/json')
      .then(res => res.json())
      .then(payload => { setSelectedCountry(payload.countryCode) })

  }, [setSelectedCountry])

  const handleCountryChange = (e: SelectChangeEvent<string>) => setSelectedCountry(e.target.value)

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
            <InputLabel>Type</InputLabel>
            <Select
              name='type'
              defaultValue={initialPropertyFilter.type}
              label="Type"
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
          <label className='property-filter-price-label'>Price: {initialPropertyFilter.priceRange[0]} - {initialPropertyFilter.priceRange[1]}</label>
          <Slider
            name='priceRange'
            size="small"
            getAriaLabel={() => 'Price range'}
            defaultValue={initialPropertyFilter.priceRange}
            valueLabelDisplay="auto"
            min={0} //Should get from server
            max={100000} //Should get from server
          />
        </div>
        <div className='property-filter-basic-item'>
          <Button fullWidth variant="contained">Search Property</Button>
        </div>
      </div>
      <div className='property-filter-advanced'>
        <Collapse in={advancedFilterOpened}>
          <div className='property-filter-advanced-content'>
            <div className='property-filter-advanced-row df fww jcsb'>
              <div className='property-filter-advanced-item'>
                <FormControl>
                  <FormLabel className="property-filter-advanced-label">Status</FormLabel>
                  <RadioGroup
                    row
                    name="status-radio-group"
                    defaultValue={initialPropertyFilter.status}
                  >
                    <FormControlLabel
                      value="for_sale"
                      className='property-filter-advanced-radio-value'
                      control={
                        <Radio
                          disableRipple
                          sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: 12,
                              marginRight: 0
                            },
                          }} />
                      }
                      label="for sale"
                    />
                    <FormControlLabel
                      value="for_rent"
                      className='property-filter-advanced-radio-value'
                      control={
                        <Radio
                          disableRipple
                          sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: 12,
                              marginRight: 0
                            },
                          }} />
                      }
                      label="for rent"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className='property-filter-advanced-item df fdc'>
                <label className='property-filter-advanced-label'>Size: {initialPropertyFilter.sizeRange[0]} - {initialPropertyFilter.sizeRange[1]} (m2)</label>
                <div className='df'>
                  <Slider
                    name='sizeRange'
                    size="small"
                    getAriaLabel={() => 'Size range'}
                    defaultValue={initialPropertyFilter.sizeRange}
                    valueLabelDisplay="auto"
                    min={0} //Should get from server
                    max={500} //Should get from server
                  />
                </div>
              </div>
              <div className='property-filter-advanced-item'>
                <Autocomplete
                  freeSolo
                  disableCloseOnSelect
                  clearOnBlur={false}
                  disablePortal
                  options={availableCities}
                  defaultValue={initialPropertyFilter.city}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City"
                      name='city'
                      placeholder='Enter a city'
                      className='property-filter-advanced-value'
                      variant='standard'
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </Collapse>
        <div className='property-filter-advanced-toggler'>
          <div onClick={() => setAdvancedFilterOpened(o => !o)}>
            <p>Advanced Search</p>
            <KeyboardArrowDownIcon fontSize='small' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyFilter