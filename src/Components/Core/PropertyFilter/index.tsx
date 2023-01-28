import './PropertyFilter.scss';

import { DetailedHTMLProps, FC, useState, useEffect } from 'react'
import { SelectChangeEvent } from '@mui/material/Select';
import CountrySelect from '../CountrySelect';
import { json } from 'stream/consumers';

export type PropertyFilterProps = {

} & DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const PropertyFilter: FC<PropertyFilterProps> = ({ className, ...rest }) => {

  const [selectedCountry, setSelectedCountry] = useState<string>('BG');
  const handleCountryChange = (e: SelectChangeEvent<string>) => setSelectedCountry(e.target.value)

  useEffect(() => {

    fetch('http://ip-api.com/json')
      .then(res => res.json())
      .then(payload => { setSelectedCountry(payload.countryCode) }) 

  }, [])

  return (
    <div {...rest} className={`property-filter${className ? ` ${className}` : ''}`}>
      <CountrySelect
        className='property-filter-country-select'
        label='Country'
        value={selectedCountry}
        onChange={handleCountryChange}
      />
    </div>
  )
}

export default PropertyFilter