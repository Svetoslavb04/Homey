import './PropertyFilter.scss';
import { FC, useState, useEffect, HTMLAttributes, DetailedHTMLProps, ChangeEvent } from 'react'

import CountrySelect from '../CountrySelect';

import { PropertyType } from '../../../enums/PropertyType';

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
import { PropertyFilterActionType, PropertyFilterState, usePropertyFilter } from './usePropertyFilter';

export type PropertyFilterProps = {

} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const PropertyFilter: FC<PropertyFilterProps> = ({ className, ...rest }) => {

  const initialPropertyFilter: PropertyFilterState = {
    country: 'BG',
    type: 'Any',
    priceRange: [0, 100000],
    status: 'Any'
  }

  const [state, dispatch] = usePropertyFilter(initialPropertyFilter);

  const [advancedFilterOpened, setAdvancedFilterOpened] = useState<boolean>(false);

  const handleCountryChange = (e: SelectChangeEvent<string>) =>
    dispatch({ type: PropertyFilterActionType.SET_COUNTRY, payload: e.target.value })

  const handleTypeChange = (e: SelectChangeEvent<string>) =>
    dispatch({ type: PropertyFilterActionType.SET_TYPE, payload: e.target.value })

  const handlePriceChange = (e: Event, newValue: number | number[]) =>
    dispatch({ type: PropertyFilterActionType.SET_PRICE_RANGE, payload: newValue })

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: PropertyFilterActionType.SET_STATUS, payload: e.target.value })

  useEffect(() => {

    fetch('http://ip-api.com/json')
      .then(res => res.json())
      .then(payload => { dispatch({ type: PropertyFilterActionType.SET_COUNTRY, payload: payload.countryCode }) })

  }, [dispatch])

  return (
    <div {...rest} className={`property-filter${className ? ` ${className}` : ''}`}>
      <div className='property-filter-basic'>
        <div className='property-filter-basic-item'>
          <CountrySelect
            className='property-filter-country-select'
            label='Country'
            value={state.country}
            onChange={handleCountryChange}
          />
        </div>
        <div className='property-filter-basic-item'>
          <FormControl variant='standard' fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              value={state.type}
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
          <p className='property-filter-price-label'>Price: {state.priceRange[0]} - {state.priceRange[1]}</p>
          <Slider
            size="small"
            getAriaLabel={() => 'Price range'}
            value={state.priceRange}
            onChange={handlePriceChange}
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
            <div className='property-filter-advanced-row'>
              <div className='property-filter-advanced-item'>
                <FormControl>
                  <FormLabel className="property-filter-advanced-label">Status</FormLabel>
                  <RadioGroup
                    row
                    name="status-radio-group"
                    value={state.status}
                    onChange={handleStatusChange}
                  >
                    <FormControlLabel
                      value="for_sale"
                      className='property-filter-advanced-value'
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
                      className='property-filter-advanced-value'
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
              <div className='property-filter-advanced-item'>
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