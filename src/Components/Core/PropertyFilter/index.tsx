import './PropertyFilter.scss';
import { FC, useState, useEffect, HTMLAttributes, DetailedHTMLProps, useRef } from 'react'

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
import Checkbox from '@mui/material/Checkbox';

import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import BalconyIcon from '@mui/icons-material/Balcony';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SvgIcon from '@mui/material/SvgIcon';
import Input from '@mui/material/Input';

const AdvancedFilterCheckBox: FC<{ label: string, Icon: typeof SvgIcon, name: string }> =
  ({ label, Icon, name }) =>
    <div className='property-filter-advanced-checkbox-item'>
      <FormControlLabel
        control={<Checkbox name={name} sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} disableRipple checkedIcon={<Icon />} />}
        label={label}
      />
    </div>

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
    bedrooms: 'Any',
    bathrooms: 'Any',
    garages: 'Any',
    claims: []
  }

  const addNewcheckBoxItemRef = useRef<HTMLDivElement | null>(null);

  const [advancedFilterOpened, setAdvancedFilterOpened] = useState<boolean>(false);

  const [selectedCountry, setSelectedCountry] = useState<string>(initialPropertyFilter.country);
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  const [customCheckBoxes, setCustomCheckBoxes] = useState<number>(0);

  const checkBoxes = [
    {
      label: 'Wifi',
      Icon: WifiIcon,
      name: 'wifi'
    }, {
      label: 'Air Conditioning',
      Icon: AcUnitIcon,
      name: 'airConditioning'
    }, {
      label: 'Fire Place',
      Icon: FireplaceIcon,
      name: 'fireplace'
    }, {
      label: 'Balcony',
      Icon: BalconyIcon,
      name: 'balcony'
    }, {
      label: 'Fitness',
      Icon: FitnessCenterIcon,
      name: 'fitness'
    }, {
      label: 'Swimming Pool',
      Icon: PoolIcon,
      name: 'swimmingPool'
    }, {
      label: 'Parking',
      Icon: LocalParkingIcon,
      name: 'parking'
    }
  ];

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

  const handleCheckBoxButtonClick = () => {
    const checkboxInput = addNewcheckBoxItemRef.current
      ?.previousElementSibling
      ?.querySelector("input[type='text']") as HTMLInputElement

    if (checkboxInput?.value === '') { return }
    
    setCustomCheckBoxes(prev => ++prev)
  }

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
            <div className='property-filter-advanced-row df fww jcsb'>
              <div className='property-filter-advanced-item'>
                <FormControl variant='standard' fullWidth>
                  <InputLabel>Bedrooms</InputLabel>
                  <Select
                    defaultValue={initialPropertyFilter.bedrooms}
                    name="bedrooms"
                    label="Bedrooms"
                  >
                    {
                      [...Array.from(Array(10).keys()).map(n => ++n), 'Any']
                        .map(number => <MenuItem key={number} value={number}>{number}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </div>
              <div className='property-filter-advanced-item'>
                <FormControl variant='standard' fullWidth>
                  <InputLabel>Bathrooms</InputLabel>
                  <Select
                    defaultValue={initialPropertyFilter.bathrooms}
                    name="bathrooms"
                    label="Bathrooms"
                  >
                    {
                      [...Array.from(Array(10).keys()).map(n => ++n), 'Any']
                        .map(number => <MenuItem key={number} value={number}>{number}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </div>
              <div className='property-filter-advanced-item'>
                <FormControl variant='standard' fullWidth>
                  <InputLabel>Garages</InputLabel>
                  <Select
                    defaultValue={initialPropertyFilter.garages}
                    name="garages"
                    label="Garages"
                  >
                    {
                      [...Array.from(Array(10).keys()).map(n => ++n), 'Any']
                        .map(number => <MenuItem key={number} value={number}>{number}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className='property-filter-advanced-checkbox-row df fww'>
              {
                checkBoxes.map(c => <AdvancedFilterCheckBox key={c.name} label={c.label} name={c.name} Icon={c.Icon} />)
              }
              {
                Array.from(Array(customCheckBoxes).keys()).map((_, i) =>
                  <div key={i} className='property-filter-advanced-checkbox-item property-filter-advanced-checkbox-new-item df'>
                    <Checkbox checked sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} disableRipple />
                    <Input
                      placeholder="Enter keyword"
                      className='property-filter-advanced-new-checkbox-label'
                      onChange={(e) => { e.target.name = e.target.value }}
                    />
                  </div>
                )
              }
              <div ref={addNewcheckBoxItemRef} className='property-filter-advanced-checkbox-item'>
                <div
                  className='df aic jcc property-filter-advanced-checkbox-add-item'
                  onClick={handleCheckBoxButtonClick}
                >
                  <AddCircleOutlineOutlinedIcon />
                </div>
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