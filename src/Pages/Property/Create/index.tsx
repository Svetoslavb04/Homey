import './Create.scss';
import { FC, useEffect, useState, useRef } from 'react';
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
import Garages from './Components/garagesSelectComponent';
import CountrySelect from '../../../Components/Core/CountrySelect';
import { Autocomplete, Checkbox, FormControlLabel, IconButton, Input, SelectChangeEvent, Slider, SvgIcon } from '@mui/material';

import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import BalconyIcon from '@mui/icons-material/Balcony';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { PhotoCamera } from '@mui/icons-material';


const AdvancedFilterCheckBox: FC<{ label: string, Icon: typeof SvgIcon, name: string }> = ({ label, Icon, name }) =>
  <div className='property-filter-advanced-checkbox-item'>
    <FormControlLabel
      control={<Checkbox name={name} sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} disableRipple checkedIcon={<Icon />} />}
      label={label}
    />
  </div>



const AddProperty: FC = () => {
    
    const [selectedCountry, setSelectedCountry] = useState<string>('Bulgaria');
    const [availableCities, setAvailableCities] = useState<string[]>([]);

    const marks = [
        {
          value: 1,
          label: 'Step 1',
        },
        {
          value: 2,
          label: 'Step 2',
        },
        {
          value: 3,
          label: 'Step 3',
        },
        {
          value: 4,
          label: 'Step 4',
        },
        {
          value: 5,
          label: 'Step 5',
        },
        {
          value: 6,
          label: 'Step 6',
        },
        {
          value: 7,
          label: 'Step 7',
        },
        {
          value: 8,
          label: 'Step 8',
        },
      ];

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


      const handleCheckBoxButtonClick = () => {
        const checkboxInput = addNewcheckBoxItemRef.current
          ?.previousElementSibling
          ?.querySelector("input[type='text']") as HTMLInputElement
    
        if (checkboxInput?.value === '') { return }
    
        setCustomCheckBoxes(prev => ++prev)
      }
    

      const handleCountryChange = (e: SelectChangeEvent<string>) => setSelectedCountry(e.target.value);

      const [Page, SetPage] = useState(0);
      
      const [customCheckBoxes, setCustomCheckBoxes] = useState<number>(0);
      const addNewcheckBoxItemRef = useRef<HTMLDivElement | null>(null);


    return (

        <div id='image-background'>
            <div id='create-container'>
                <div className='add-form-wrapper'>
                    <form id='add-form'>
                    {Page >0 &&
                        <Slider
                            aria-label="Temperature"
                            defaultValue={1}
                            valueLabelDisplay="off"
                            value={Page}
                            step={1}
                            marks={marks}
                            min={1}
                            max={8}
                            disabled
                        />
                    }
                    
                        {Page == 0 &&
                            <div className='info-container'>
                                <h1>Want to list a property?</h1>  
                                <div className='button'>
                                    <Button fullWidth variant="contained" size='large' id='add-button' onClick={() => SetPage(1)}>Lets Start</Button>
                                </div>
                            </div>
                        }

                        {Page == 1 && 
                            <div className='info-container'>
                                <h1>Where is your property located?</h1>

                                <div className='content-container'>
                                    <div id='country' className='inputField'>
                                            <CountrySelect
                                            className='property-filter-country-select'
                                            label='Country'
                                            value={selectedCountry}
                                            onChange={handleCountryChange}
                                        />
                                    </div>
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

                                </div>
                                
                            </div>
                        }

                        {Page == 2 && 
                            <div className='info-container'>
                                <h1> Tell me more about your property? </h1>
                                
                                <div className='content-container'>
                                    <div id="name" className='inputField'>
                                        <TextField
                                            fullWidth
                                            label="Name of the Property"
                                            variant="standard"
                                            color="secondary"
                                            error={false}
                                        />
                                    </div>
                                    <div id="year" className='inputField'>
                                        <TextField
                                            fullWidth
                                            label="Year of construction"
                                            variant="standard"
                                            color="secondary"
                                            error={false}
                                        />
                                    </div>

                                </div>

                                <div className='content-container'>           
                                    <div id='status' className='inputField'> 
                                        <Status/>
                                    </div>
                                    <div id='type' className='inputField'> 
                                        <Type/>
                                    </div>   

                                </div>

                            </div>
                        }
                        
                        {Page == 3 && 
                            <div className='info-container'>
                                <h1>What is the size of the property?</h1>

                                <div className='content-container'>
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
                                    <div id="number-bedrooms" className='inputField'>
                                        <Bedrooms/>
                                    </div>
                                </div>    
                                    
                                <div className='content-container'>    
                                    <div id="number-batrooms" className='inputField'>
                                        <Bathrooms/>
                                    </div>
                                    <div id="number-garages" className='inputField'>
                                        <Garages/>
                                    </div>
                                </div>
                            </div>
                        }

                        {Page == 4 && 
                            <div className='info-container'>
                                <h1>Please, describe briefly the property!</h1>

                                <div className='content-container'>
                                    <TextField className='inputField'
                                        id="standard-multiline-static"
                                        label="Descripton"
                                        multiline
                                        rows={4}
                                        placeholder=". . ."
                                        variant="outlined"
                                    />
                                </div>

                            </div>
                        }

                        { Page == 5 && 
                            <div className ='info-container'> 
                                <h1> Set a price!</h1>           
                                <div id='content-container'>    
                                    <div id="price" className='inputField'>
                                        <TextField 
                                            fullWidth
                                            label="Price"
                                            variant="standard"
                                            color="secondary"
                                            error={false}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                                }}
                                        />
                                    </div>
                                </div>

                            </div>
                        }
            
                        { Page == 6 && 
                            <div className ='info-container'> 
                                <h1> Give a contact number!</h1>           
                                <div id='content-container'>    
                                    <div id="contact-number" className='inputField'>
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            variant="standard"
                                            color="secondary"
                                            error={false}
                                        />
                                    </div>
                                </div>

                            </div>
                        }

                        { Page == 7 && 
                            <div className ='info-container'> 
                                <h1>Upload some photos!</h1>           
                                <div id='content-container'>

                                <label htmlFor="images" className="drop-container">
                                    <span className="drop-title">Drop files here</span>
                                    or
                                    <input type="file" id="images" accept="image/*" required/>
                                    <input type="file" id="images" accept="image/*" required/>
                                    <input type="file" id="images" accept="image/*" required/>
                                    <input type="file" id="images" accept="image/*" required/>
                                </label>
                                
                                {/* <IconButton  color="secondary" aria-label="upload picture" component="label">
                                    <input accept="image/*" type="file" />
                                    <PhotoCamera className='image-upload-button'/>
                                </IconButton> */}
                                </div>

                            </div>
                        } 

                        { Page == 8 && 
                            <div className ='info-container'> 
                                <h1>Mark the available extras!(If any!) </h1>           
                                <div id='content-container'>    
                                    <div className='property-filter-advanced-checkbox-row df fww'>
                                            {
                                                checkBoxes.map(c => <AdvancedFilterCheckBox key={c.name} label={c.label} name={c.name} Icon={c.Icon} />)
                                            }
                                            {
                                                Array.from(Array(customCheckBoxes).keys()).map((_, i) =>
                                                <div key={i} className='property-filter-advanced-checkbox-item property-filter-advanced-checkbox-new-item df'>
                                                    <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} disableRipple />
                                                    <Input
                                                    placeholder="Enter keyword"
                                                    className='property-filter-advanced-new-checkbox-label'
                                                    onChange={(e) => {
                                                        const input = e.target.parentElement?.parentElement?.children[0].children[0];

                                                        if (input && input.tagName.toLowerCase() === 'input') {
                                                        (input as HTMLInputElement).name = e.target.value
                                                        }
                                                    }}
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
                                <div id='create-navigation'>
                                    <div className='button'>
                                        <Button fullWidth variant="contained" size='large' id='go-back-button' onClick={() => SetPage(old => old-1)}> ◄ </Button>
                                    </div>
                                    <div className='button'>
                                        <Button fullWidth variant="contained" size='large' id='add-button' type='submit'>Publish listing</Button>
                                    </div>
                                </div>
                                    
                            </div>
                        } 

                        {Page >0 && Page<8 && 
                            <div id='create-navigation'>
                                <div className='button'>
                                    <Button fullWidth variant="contained" size='large' id='go-back-button' onClick={() => SetPage(old => old-1)}> ◄ </Button>
                                </div>
                                <div className='button'>
                                    <Button fullWidth variant="contained" size='large' id='continue-button' onClick={() => SetPage(old => old+1)}> Continue</Button>
                                </div>
                            </div>
                            
                        }
                        
   
                    </form>
                </div>
            </div>
        </div>
    )
}



export default AddProperty;