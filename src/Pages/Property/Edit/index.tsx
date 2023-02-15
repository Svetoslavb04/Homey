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
import CountrySelect from '../../../Components/CountrySelect';
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
import { useNavigate, useParams } from 'react-router';
import { edit, getById } from '../../../services/propertyService';
import { useAuthContext } from '../../../contexts/AuthContext';
import PageLoader from '../../../Components/Core/PageLoader';

const EditProperty: FC = () => {

    const { user } = useAuthContext();
    const { propertyId } = useParams();

    const { popNotification } = useNotificationContext();
    const navigate = useNavigate();

    const [property, setProperty] = useState<IProperty | null>(null);

    const [claims, setClaims] = useState<string[]>([]);

    const [formData, dispatch] = useEditFormData();

    useEffect(() => {
        getById(propertyId || '')
            .then(payload => {

                const property = { ...payload[0] }

                if (!property._id) {
                    navigate('/properties')
                    return popNotification({ type: 'error', message: 'Property not found!' })
                }

                setProperty(property)
            })
            .catch(err => console.log(err))
    }, [propertyId, navigate, popNotification])

    useEffect(() => {

        if (property) {

            if (property.agency_id._id !== user._id) {
                navigate('/properties')
                return popNotification({ type: 'error', message: 'You are not allowed to edit this property' })
            }

            dispatch({ type: ActionTypes.CHANGE_NAME, payload: property.name })
            dispatch({ type: ActionTypes.CHANGE_COUNTRY, payload: property.country })
            dispatch({ type: ActionTypes.CHANGE_CITY, payload: property.city })
            dispatch({ type: ActionTypes.CHANGE_STREET, payload: property.street })
            dispatch({ type: ActionTypes.CHANGE_NUMBER, payload: property.number || 0 })
            dispatch({ type: ActionTypes.CHANGE_TYPE, payload: property.type })
            dispatch({ type: ActionTypes.CHANGE_NAME, payload: property.name })
            dispatch({ type: ActionTypes.CHANGE_PRICE, payload: property.price })
            dispatch({ type: ActionTypes.CHANGE_SIZE, payload: property.size })
            dispatch({ type: ActionTypes.CHANGE_STATUS, payload: property.status })
            dispatch({ type: ActionTypes.CHANGE_BATHROOMS, payload: property.bathrooms })
            dispatch({ type: ActionTypes.CHANGE_BEDROOMS, payload: property.bedrooms })
            dispatch({ type: ActionTypes.CHANGE_GARAGES, payload: property.garages })
            dispatch({ type: ActionTypes.CHANGE_YEARBUILT, payload: property.yearBuilt })
            dispatch({ type: ActionTypes.CHANGE_DESCRIPTION, payload: property.description })

            setClaims(property.claims.map(c => `claim_${c.name}`))
        }

    }, [property, dispatch, user._id, navigate, popNotification])

    const [availableCities, setAvailableCities] = useState<string[]>([]);

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

    const nonCustomCheckboxes = ['wifi', 'airConditioning', 'fireplace', 'balcony', 'fitness', 'swimmingPool', 'parking']

    useEffect(() => {

        fetch('http://ip-api.com/json')
            .then(res => res.json())
            .then(payload => { dispatch({ type: ActionTypes.CHANGE_COUNTRY, payload: payload.country }) })

    }, [dispatch]);

    useEffect(() => {

        if (!countries.some(c => c.name === formData.country.value)) { return setAvailableCities([]) }

        fetch(citiesOfCountryURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ country: countries.filter(c => c.name === formData.country.value)[0].name })
        })
            .then(res => res.json())
            .then(payload => setAvailableCities(payload.data))
            .catch(err => console.log(err))

    }, [formData.country.value]);

    const handleCheckBoxButtonClick = () => {
        const checkboxInput = addNewcheckBoxItemRef.current
            ?.previousElementSibling
            ?.querySelector("input[type='text']") as HTMLInputElement

        if (checkboxInput?.value === '') { return }

        setCustomCheckBoxes(prev => ++prev)
    }
    const [customCheckBoxes, setCustomCheckBoxes] = useState<number>(0);
    const addNewcheckBoxItemRef = useRef<HTMLDivElement | null>(null);

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (validateValues(formData)) { return }

        const serverFormData = new FormData(e.currentTarget as HTMLFormElement)
        serverFormData.append('country', formData.country.value);

        serverFormData.forEach((value, key) => {
            if (key.startsWith('claim_')) {
                serverFormData.append('claims', key.split('claim_')[1])
            }
        })

        try {
            const res = await edit(property?._id || '', serverFormData)

            if (!res[0]?._id) { throw res.message }

            popNotification({ type: 'success', message: 'Succesful edit!' });
            navigate(`/properties/${propertyId}`, { replace: true });

        } catch (error: any) {
            popNotification({ type: 'error', message: error.message || error })
        }
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
            {!property && <PageLoader />}
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
                            <div className='inputField'>
                                <TextField
                                    fullWidth
                                    label="Year Built"
                                    name='yearBuilt'
                                    helperText={formData.yearBuilt?.error && "Year build should bot be after " + (new Date().getFullYear() + 50)}
                                    variant="standard"
                                    color="secondary"
                                    error={formData.yearBuilt?.error}
                                    value={formData.yearBuilt?.value === 0 ? '' : formData.yearBuilt?.value || ''}
                                    onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_YEARBUILT, payload: e.target.value }) }}
                                    onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_YEARBUILT, payload: e.target.value }) }}
                                />
                            </div>
                            <div id='status' className='inputField'>
                                <Status
                                    value={formData.status.value.toString()}
                                    onChange={(newValue) => { dispatch({ type: ActionTypes.CHANGE_STATUS, payload: newValue }) }}
                                />
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
                                <Bedrooms
                                    value={formData.bedrooms.value.toString()}
                                    onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_BEDROOMS, payload: e.target.value }) }}
                                />
                            </div>
                            <div id="number-garages" className='inputField'>
                                <Garages
                                    value={formData.garages.value.toString()}
                                    onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_GARAGES, payload: e.target.value }) }} />
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
                            checkBoxes.map(c =>
                                <div key={c.name} className='property-filter-advanced-checkbox-item'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={claims?.some(name => name?.split('claim_')[1] === c.name) || false}
                                                onChange={(e) => {
                                                    setClaims(claims => {

                                                        const index = claims.indexOf(e.target.name);

                                                        if (index > -1 && !e.target.checked) {
                                                            claims.splice(index, 1)
                                                        } else if (e.target.checked) {
                                                            claims.push(`${e.target.name}`)
                                                        }
                                                        return [...claims]
                                                    })
                                                }}
                                                name={`claim_${c.name}`}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}
                                                disableRipple
                                                checkedIcon={<c.Icon />}
                                            />
                                        }
                                        label={c.label}
                                    />
                                </div>
                            )
                        }
                        {
                            property?.claims.filter(c => !nonCustomCheckboxes.includes(c.value))
                                .map((c, i) =>
                                    <div key={i} className='property-filter-advanced-checkbox-item property-filter-advanced-checkbox-new-item df'>
                                        <Checkbox name={c.value} defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} disableRipple />
                                        <Input
                                            placeholder="Enter keyword"
                                            className='property-filter-advanced-new-checkbox-label'
                                            defaultValue={c.value}
                                            onChange={(e) => {
                                                const input = e.target.parentElement?.parentElement?.children[0].children[0];
                                                
                                                if (input && input.tagName.toLowerCase() === 'input') {
                                                    (input as HTMLInputElement).name = `claim_${e.target.value}`
                                                }
                                            }}
                                        />
                                    </div>
                                )
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
                                                (input as HTMLInputElement).name = `claim_${e.target.value}`
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
                        <input name="image" type="file" className="image" accept="image/*" required />
                        <input name="image" type="file" className="image" accept="image/*" required />
                        <input name="image" type="file" className="image" accept="image/*" required />
                        <input name="image" type="file" className="image" accept="image/*" required />
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