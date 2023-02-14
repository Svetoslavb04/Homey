import './Edit.scss';
import { FC, FormEvent, useEffect, useRef, useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { countries } from '../../../assets/js/countries';
import { citiesOfCountryURL } from '../../../assets/js/APIs';
import { IProperty } from '../../../interfaces/IProperty';

import Status from './Components/radioStatusComponent';
import Type from './Components/typeSelectComponent';
import Bedrooms from './Components/bedroomsSelectComponent';
import Bathrooms from './Components/bathroomsSelectComponent';
import Garages from './Components/garagesSelectComponent';
import CountrySelect from '../../../Components/Core/CountrySelect';
import { Autocomplete, Checkbox, FormControlLabel, Input, SelectChangeEvent, SvgIcon } from '@mui/material';

import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import BalconyIcon from '@mui/icons-material/Balcony';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { ActionTypes, PropertyFormData, useEditFormData } from './useEditFormData';
import { useNotificationContext } from '../../../contexts/NotificationContext/NotificationContext';
import { useNavigate } from 'react-router';


const AdvancedCheckBox: FC<{ label: string, Icon: typeof SvgIcon, name: string }> = ({ label, Icon, name }) =>
    <div className='property-filter-advanced-checkbox-item'>
        <FormControlLabel
            control={<Checkbox name={name} sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} disableRipple checkedIcon={<Icon />} />}
            label={label}
        />
    </div>

const EditProperty: FC = () => {

    const [selectedCountry, setSelectedCountry] = useState<string>('BG');
    const [availableCities, setAvailableCities] = useState<string[]>([]);

    const { popNotification } = useNotificationContext();
    const navigate = useNavigate();

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
            .then(payload => { setSelectedCountry(payload.country) })

    }, [setSelectedCountry]);

    useEffect(() => {

        if (!countries.some(c => c.name === selectedCountry)) { return setAvailableCities([]) }

        fetch(citiesOfCountryURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ country: countries.filter(c => c.name === selectedCountry)[0].name })
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
    const [customCheckBoxes, setCustomCheckBoxes] = useState<number>(0);
    const addNewcheckBoxItemRef = useRef<HTMLDivElement | null>(null);

    const [formData, dispatch] = useEditFormData();

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (validateValues(formData)) {
            popNotification({ type: 'success', message: 'Succesful edit!' });
            return
        }

        const serverFormData = new FormData(e.currentTarget as HTMLFormElement)
        serverFormData.forEach((value, key) => {
            console.log(value, key);
        })
        
        try {
            //const res = await editProperty(normalizedPropertyInfo)

            //if (res.status !== 200) { throw res.message }

            popNotification({ type: 'success', message: 'Succesful edit!' });
            //navigate('/', { replace: true });

        } catch (error: any) { popNotification({ type: 'error', message: error }) }
    }


    function validateValues(object: PropertyFormData) {
        let flag = false;

        if (Object.values(object).some(v => v.error)) {
            popNotification({ type: 'error', message: 'All fields must be valid!' })
            flag = true;
        } else if (Object.values(object).some(v => v.value === '')) {
            popNotification({ type: 'error', message: 'All fields are required!' })
            flag = true;
        }

        return flag
    }

    return (
        <div id='edit-container'>
            <div className='edit-form-wrapper'>
                <form id='edit-form' encType='multipart/form-data' onSubmit={handleFormSubmit}>
                    <h1>Edit page</h1>
                    <div id='info-container'>
                        <div id='left-side'>
                            <div id='country' className='inputField'>
                                <CountrySelect
                                    className='property-filter-country-select'
                                    label='Country'
                                    value={formData.country.value}
                                    onChange={(e: SelectChangeEvent) => dispatch({ type: ActionTypes.CHANGE_COUNTRY, payload: e.target.value })}
                                />
                            </div>

                            <div id="street" className='inputField'>
                                <TextField
                                    fullWidth
                                    label="Street"
                                    variant="standard"
                                    color="secondary"
                                    name='street'
                                    helperText={formData.street.error && "The name of the street should be less than 120 characters long!"}
                                    value={formData.street.value}
                                    error={formData.street.error}
                                    onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_STREET, payload: e.target.value }) }}
                                    onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_STREET, payload: e.target.value }) }}
                                />
                            </div>

                            <div id='type' className='inputField'>
                                <Type
                                    value={formData.type.value}
                                    onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_TYPE, payload: e.target.value }) }}
                                />
                            </div>

                            <div id="name" className='inputField'>
                                <TextField
                                    fullWidth
                                    label="Name of the Property"
                                    variant="standard"
                                    color="secondary"
                                    name='name'
                                    helperText={formData.name.error && "The name should be between 4 and 250 characters long!"}
                                    value={formData.name.value}
                                    error={formData.name.error}
                                    onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_NAME, payload: e.target.value }) }}
                                    onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_NAME, payload: e.target.value }) }}
                                />
                            </div>
                            <div id="size" className='inputField'>
                                <TextField
                                    fullWidth
                                    label="Size"
                                    variant="standard"
                                    color="secondary"
                                    name='size'
                                    helperText={formData.size.error && "The property size should be less than 999999 m²!"}
                                    value={formData.size.value}
                                    error={formData.size.error}
                                    onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_SIZE, payload: e.target.value }) }}
                                    onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_SIZE, payload: e.target.value }) }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                                    }}
                                />
                            </div>
                            <div id="number-batrooms" className='inputField'>
                                <Bathrooms
                                    value={formData.bathrooms.value.toString()}
                                    onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_BATHROOMS, payload: e.target.value }) }}
                                />
                            </div>
                        </div>
                        <div id='right-side'>
                            <div id='city' className='inputField'>
                                <Autocomplete
                                    freeSolo
                                    clearOnBlur={false}
                                    disablePortal
                                    options={availableCities}
                                    defaultValue=""
                                    value={formData.city.value}
                                    onChange={(e: any) => { dispatch({ type: ActionTypes.CHANGE_CITY, payload: e.target.textContent }) }}
                                    onBlur={(e: any) => { dispatch({ type: ActionTypes.VALIDATE_CITY, payload: e.target.value }) }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="City"
                                            name='city'
                                            placeholder='Enter a city'
                                            className='property-filter-advanced-value'
                                            variant='standard'
                                            helperText={formData.city.error && "City length cannot be more than 85"}
                                            error={formData.city.error}
                                        />
                                    )}
                                />
                            </div>
                            <div id="number" className='inputField'>
                                <TextField
                                    fullWidth
                                    label="Number"
                                    name='number'
                                    helperText={formData.number?.error && "Number should be a number and less then 9999!"}
                                    variant="standard"
                                    color="secondary"
                                    error={formData.number?.error}
                                    value={formData.number?.value === 0 ? '' : formData.number?.value || ''}
                                    onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_NUMBER, payload: e.target.value }) }}
                                    onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_NUMBER, payload: e.target.value }) }}
                                />
                            </div>
                            <div id='status' className='inputField'>
                                <Status />
                            </div>
                            <div id="price" className='inputField'>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    name='price'
                                    variant="standard"
                                    color="secondary"
                                    helperText={formData.price.error && "Price should be a number and less than 9999999999!"}
                                    value={formData.price.value}
                                    error={formData.price.error}
                                    onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_PRICE, payload: e.target.value }) }}
                                    onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_PRICE, payload: e.target.value }) }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                    }}
                                />
                            </div>
                            <div id="number-bedrooms" className='inputField'>
                                <Bedrooms />
                            </div>
                            <div id="number-bedrooms" className='inputField'>
                                <Garages />
                            </div>
                        </div>
                    </div>
                    <div className='description-container'>
                        <TextField
                            className='inputField edit-description-field'
                            name='description'
                            label="Descripton"
                            multiline
                            rows={4}
                            placeholder=". . ."
                            variant="outlined"
                            helperText={formData.description.error && "Description length should be less than 9999 symbols!"}
                            value={formData.description.value}
                            error={formData.description.error}
                            onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_DESCRIPTION, payload: e.target.value }) }}
                            onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_DESCRIPTION, payload: e.target.value }) }}
                        />
                    </div>
                    <div className='edit-checkbox-row df fww'>
                        {
                            checkBoxes.map(c => <AdvancedCheckBox key={c.name} label={c.label} name={c.name} Icon={c.Icon} />)
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
                    <div id='images'>
                        <input name="image1" type="file" className="image" accept="image/*" required />
                        <input name="image2" type="file" className="image" accept="image/*" required />
                        <input name="image3" type="file" className="image" accept="image/*" required />
                        <input name="image4" type="file" className="image" accept="image/*" required />
                    </div>
                    <div id='add-button-container'>
                        <Button fullWidth variant="contained" size='large' id='add-button' type='submit'>Edit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default EditProperty;