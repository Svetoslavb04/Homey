import './Create.scss';
import { FC, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { countries } from '../../../assets/js/countries';
import { citiesOfCountryURL } from '../../../assets/js/APIs';


import Status from './Components/radioStatusComponent';
import Type from './Components/typeSelectComponent';
import Bedrooms from './Components/bedroomsSelectComponent';
import Bathrooms from './Components/bathroomSelectComponent';
import CountrySelect from '../../../Components/Core/CountrySelect';
import { Autocomplete, SelectChangeEvent } from '@mui/material';





const AddProperty: FC = () => {
    
    const [selectedCountry, setSelectedCountry] = useState<string>('Bulgaria');
    const [availableCities, setAvailableCities] = useState<string[]>([]);

    useEffect(() => {

        fetch('http://ip-api.com/json')
          .then(res => res.json())
          .then(payload => { setSelectedCountry(payload.countryCode) })
    
      }, [setSelectedCountry]);


      useEffect(() => {

        if (!countries.some(c => c.code === selectedCountry)) { return setAvailableCities([]) }
    
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
    
      }, [selectedCountry]);
    
      const handleCountryChange = (e: SelectChangeEvent<string>) => setSelectedCountry(e.target.value);




    return (

        <div id='image-background'>
            <div id='create-container'>
                <div className='add-form-wrapper'>
                    <form id='add-form'>
                        <h1>List a property</h1>  
                        <div id='info-container'>

                            <div id='left-side'>
                                <div id='country' className='inputField'>
                                    <CountrySelect
                                        className='property-filter-country-select'
                                        label='Country'
                                        value={selectedCountry}
                                        onChange={handleCountryChange}
                                    />
                                </div>
                                

                                 <div id='type' className='inputField'> 
                                    <Type/>
                                 </div>       
                                    
                                <div id="name" className='inputField'>
                                    <TextField
                                        fullWidth
                                        label="Name of the Property"
                                        variant="standard"
                                        color="secondary"
                                        error={false}
                                    />
                                </div>
                                <div id="size" className='inputField'>
                                    <TextField
                                        fullWidth
                                        label="Size"
                                        variant="standard"
                                        color="secondary"
                                        error={false}
                                        InputProps={{
                                           endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                                          }}
                                    />
                                </div>
                                <div id="number-batrooms" className='inputField'>
                                    <Bathrooms/>
                                </div>
                                <div id="agency" className='inputField'>
                                    <TextField
                                        fullWidth
                                        label="Agency Name"
                                        variant="standard"
                                        color="secondary"
                                        error={false}
                                    />
                                </div>
                            </div>


                            <div id='right-size'>
                                
                                <div id='city' className='inputField'>
                                    <Autocomplete
                                        freeSolo
                                        clearOnBlur={false}
                                        disablePortal
                                        options={availableCities}
                                        defaultValue=""
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

                                <div id='status' className='inputField'> 
                                    <Status/>
                                </div>
                                <div id="price" className='inputField'>
                                    <TextField
                                        fullWidth
                                        label="Price"
                                        variant="standard"
                                        color="secondary"
                                        error={false}
                                    />
                                </div> 
                                <div id="number-bedrooms" className='inputField'>
                                    <Bedrooms/>
                                </div>
                                <div id="contact-number" className='inputField'>
                                    <TextField
                                        fullWidth
                                        label="Contact number"
                                        variant="standard"
                                        color="secondary"
                                        error={false}
                                    />
                                </div>
                            </div>
                        </div>
                        

                        <div id='add-button-container'>
                            <Button fullWidth variant="contained" size='large' id='add-button' type='submit'>Add Property</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}



export default AddProperty;