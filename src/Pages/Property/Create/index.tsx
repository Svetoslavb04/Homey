import './Create.scss';
import { FC, useEffect, useState, useRef, useCallback, FormEvent } from 'react';

import { countries } from '../../../assets/js/countries';
import { citiesOfCountryURL } from '../../../assets/js/APIs';

import Status from './Components/radioStatusComponent';
import Type from './Components/typeSelectComponent';
import Bedrooms from './Components/bedroomsSelectComponent';
import Bathrooms from './Components/bathroomSelectComponent';
import Garages from './Components/garagesSelectComponent';
import CountrySelect from '../../../Components/CountrySelect';
import { Autocomplete, Checkbox, FormControlLabel, Input, Slider, SvgIcon } from '@mui/material';

import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import BalconyIcon from '@mui/icons-material/Balcony';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { ActionTypes, PropertyFormData, useAddPropertyFormData } from './useAddPropertyFormData';
import { create } from '../../../services/propertyService';
import { useNavigate } from 'react-router';
import { useNotificationContext } from '../../../contexts/NotificationContext/NotificationContext';

const AdvancedCheckBox: FC<{ label: string, Icon: typeof SvgIcon, name: string }> = ({ label, Icon, name }) =>
    <div className='property-filter-advanced-checkbox-item'>
        <FormControlLabel
            control={<Checkbox name={name} sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} disableRipple checkedIcon={<Icon />} />}
            label={label}
        />
    </div>

const AddProperty: FC = () => {

    const navigate = useNavigate();
    const { popNotification } = useNotificationContext();

    const [formData, dispatch] = useAddPropertyFormData();
    const [availableCities, setAvailableCities] = useState<string[]>([]);

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
            body: JSON.stringify({ country: countries.filter(c => c.name === formData.country.value)[0]?.name })
        })
            .then(res => res.json())
            .then(payload => {
                setAvailableCities(payload.data)
            })
            .catch(err => console.log(err))

    }, [formData.country.value]);

    const [Page, SetPage] = useState(0);

    const [customCheckBoxes, setCustomCheckBoxes] = useState<number>(0);
    const addNewcheckBoxItemRef = useRef<HTMLDivElement | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const goBackButtonRef = useRef<HTMLButtonElement>(null);
    const continueButtonRef = useRef<HTMLButtonElement>(null);

    const images = useRef<File[]>([]);
    const imagesContainerRef = useRef<HTMLDivElement>(null);

    const validateCurrentPage = useCallback(() => {

        const currentFormData = new FormData(formRef.current!);
        let isValid = true;

        Array.from(currentFormData.entries())
            .forEach((value, i) => {

                if (formData[value[0] as keyof PropertyFormData]?.error || value[1] === '') {
                    isValid = false
                } else if (value[1] instanceof File && value[0] === 'image') {
                    if (images.current.some(i => i.size === 0) || images.current.length < 4) {
                        isValid = false
                    }
                }
            })

        return isValid

    }, [formData]);

    const setNavigationButtonState = useCallback(() => {

        if (continueButtonRef.current) {
            const valid = validateCurrentPage()

            continueButtonRef.current.disabled = false;
            continueButtonRef.current.classList.remove('Mui-disabled')

            if (!valid && continueButtonRef.current) {
                continueButtonRef.current.disabled = true;
                continueButtonRef.current.classList.add('Mui-disabled')

                return false
            }

            return true
        }

    }, [validateCurrentPage]);

    useEffect(() => {
        setNavigationButtonState()
    }, [formData, setNavigationButtonState])

    useEffect(() => {

        setNavigationButtonState();

        if (Page === 6 && imagesContainerRef.current) {

            const imageInputs: HTMLInputElement[] = Array.from(imagesContainerRef.current.children)
                .filter(e => e instanceof HTMLInputElement) as HTMLInputElement[]

            imageInputs.forEach((input, i) => {

                if (images.current[i] && images.current[i].size > 0) {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(images.current[i]);
                    input.files = dataTransfer.files;
                }
            })
        }
    }, [Page, setNavigationButtonState])

    const handlePageChange = (newPage: number) => {
        setNavigationButtonState()
        SetPage(newPage)
    }

    const handleImageInputChange = () => {

        const currentFormData = new FormData(formRef.current!);
        images.current = [...currentFormData.getAll('image') as File[]];

        setNavigationButtonState()
    }

    const handleCheckBoxButtonClick = () => {
        const checkboxInput = addNewcheckBoxItemRef.current
            ?.previousElementSibling
            ?.querySelector("input[type='text']") as HTMLInputElement

        if (checkboxInput?.value === '') { return }

        setCustomCheckBoxes(prev => ++prev)
    }

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const serverFormData = new FormData();
        serverFormData.append('country', formData.country.value);
        serverFormData.append('city', formData.city.value);
        serverFormData.append('street', formData.street.value);
        if (formData.number?.value && formData.number?.value > 0) {
            serverFormData.append('number', formData.number?.value.toString());
        }
        serverFormData.append('name', formData.name.value);
        serverFormData.append('yearBuilt', formData.yearBuilt.value.toString());
        serverFormData.append('status', formData.status.value);
        serverFormData.append('type', formData.type.value);
        serverFormData.append('size', formData.size.value.toString());
        serverFormData.append('bedrooms', formData.bedrooms.value.toString());
        serverFormData.append('bathrooms', formData.bathrooms.value.toString());
        serverFormData.append('garages', formData.garages.value.toString());
        serverFormData.append('description', formData.description.value);
        serverFormData.append('price', formData.price.value.toString());

        images.current.forEach(i => {
            serverFormData.append('image', i)
        })

        const currentFormData = new FormData(formRef.current!)
        currentFormData.forEach((value, key) => {
            serverFormData.append('claims', key)
        })

        try {
            const res = await create(serverFormData)

            if (res.message) { throw res.message }

            popNotification({ type: 'success', message: 'Successfully added a property!' })
            navigate(`/properties/${res._id}`);

        } catch (error: any) { popNotification({ type: 'error', message: error }) }
    }

    const hideStep = (document.body.hasAttribute('sidebar-opened') && window.innerWidth < 680) || window.innerWidth < 370;

    const marks = [
        {
            value: 1,
            label: `${hideStep ? '' : 'Step'} 1`,
        },
        {
            value: 2,
            label: `${hideStep ? '' : 'Step'} 2`,
        },
        {
            value: 3,
            label: `${hideStep ? '' : 'Step'} 3`,
        },
        {
            value: 4,
            label: `${hideStep ? '' : 'Step'} 4`,
        },
        {
            value: 5,
            label: `${hideStep ? '' : 'Step'} 5`,
        },
        {
            value: 6,
            label: `${hideStep ? '' : 'Step'} 6`,
        },
        {
            value: 7,
            label: `${hideStep ? '' : 'Step'} 7`,
        }
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

    return (
        <div id='image-background'>
            <div id='create-container'>
                <div className='add-form-wrapper' data-page={Page + 1}>
                    <form ref={formRef} encType='multipart/form-data' id='add-form' onSubmit={handleFormSubmit}>
                        {Page > 0 &&
                            <Slider
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
                        {Page === 0 &&
                            <div className='info-container'>
                                <h1>Want to list a property?</h1>
                                <div className='button'>
                                    <Button fullWidth variant="contained" size='large' id='add-button' onClick={() => SetPage(1)}>Lets Start</Button>
                                </div>
                            </div>
                        }
                        {Page === 1 &&
                            <div className='info-container'>
                                <h1>Where is your property located?</h1>

                                <div className='content-container'>
                                    <div id='country' className='inputField'>
                                        <CountrySelect
                                            label='Country'
                                            value={formData.country.value}
                                            onChange={(e: any) => { dispatch({ type: ActionTypes.CHANGE_COUNTRY, payload: e.target.value }) }}
                                        />
                                    </div>
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
                                                    variant='standard'
                                                    helperText={formData.city.error && "City length cannot be more than 85"}
                                                    error={formData.city.error}

                                                />
                                            )}
                                        />
                                    </div>

                                </div>
                                <div className='content-container'>
                                    <div id="street" className='inputField'>
                                        <TextField
                                            fullWidth
                                            label="Street"
                                            name='street'
                                            variant="standard"
                                            color="secondary"
                                            helperText={formData.street.error && "Street length cannot be more than 120"}
                                            error={formData.street.error}
                                            value={formData.street.value}
                                            onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_STREET, payload: e.target.value }) }}
                                            onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_STREET, payload: e.target.value }) }}
                                        />
                                    </div>
                                    <div id="number" className='inputField'>
                                        <TextField
                                            fullWidth
                                            name='number'
                                            label="Number"
                                            variant="standard"
                                            color="secondary"
                                            helperText={formData.number?.error && "Invalid number"}
                                            error={formData.number?.error}
                                            value={formData.number?.value === 0 ? '' : formData.number?.value || ''}
                                            onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_NUMBER, payload: e.target.value }) }}
                                            onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_NUMBER, payload: e.target.value }) }}
                                        />
                                    </div>

                                </div>

                            </div>
                        }
                        {Page === 2 &&
                            <div className='info-container'>
                                <h1> Tell me more about your property? </h1>

                                <div className='content-container'>
                                    <div id="name" className='inputField'>
                                        <TextField
                                            fullWidth
                                            name='name'
                                            label="Name of the Property"
                                            variant="standard"
                                            color="secondary"
                                            helperText={formData.name?.error && "Invalid name"}
                                            error={formData.name?.error}
                                            value={formData.name?.value}
                                            onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_NAME, payload: e.target.value }) }}
                                            onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_NAME, payload: e.target.value }) }}
                                        />
                                    </div>
                                    <div id="year" className='inputField'>
                                        <TextField
                                            fullWidth
                                            label="Year of construction"
                                            name='yearBuilt'
                                            variant="standard"
                                            color="secondary"
                                            helperText={formData.yearBuilt?.error && "Invalid Year"}
                                            error={formData.yearBuilt.error}
                                            value={formData.yearBuilt.value === 0 ? '' : formData.yearBuilt.value}
                                            onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_YEARBUILT, payload: e.target.value }) }}
                                            onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_YEARBUILT, payload: e.target.value }) }}
                                        />
                                    </div>

                                </div>

                                <div className='content-container'>
                                    <div id='status' className='inputField'>
                                        <Status
                                            value={formData.status.value}
                                            onChange={(newValue) => { dispatch({ type: ActionTypes.CHANGE_STATUS, payload: newValue }) }}
                                        />
                                    </div>
                                    <div id='type' className='inputField'>
                                        <Type
                                            value={formData.type.value}
                                            onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_TYPE, payload: e.target.value }) }}
                                        />
                                    </div>

                                </div>

                            </div>
                        }
                        {Page === 3 &&
                            <div className='info-container'>
                                <h1>What is the size of the property?</h1>

                                <div className='content-container'>
                                    <div id="size" className='inputField'>
                                        <TextField
                                            fullWidth
                                            name='size'
                                            label="Size"
                                            variant="standard"
                                            color="secondary"
                                            helperText={formData.size.error && "Invalid size"}
                                            error={formData.size.error}
                                            value={formData.size.value === 0 ? '' : formData.size.value}
                                            onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_SIZE, payload: e.target.value }) }}
                                            onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_SIZE, payload: e.target.value }) }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                                            }}
                                        />
                                    </div>
                                    <div id="number-bedrooms" className='inputField'>
                                        <Bedrooms
                                            value={formData.bedrooms.value.toString()}
                                            onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_BEDROOMS, payload: e.target.value }) }}
                                        />
                                    </div>
                                </div>

                                <div className='content-container'>
                                    <div id="number-batrooms" className='inputField'>
                                        <Bathrooms
                                            value={formData.bathrooms.value.toString()}
                                            onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_BATHROOMS, payload: e.target.value }) }}
                                        />
                                    </div>
                                    <div id="number-garages" className='inputField'>
                                        <Garages
                                            value={formData.garages.value.toString()}
                                            onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_GARAGES, payload: e.target.value }) }}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        {Page === 4 &&
                            <div className='info-container'>
                                <h1>Please, describe briefly the property!</h1>

                                <div className='content-container'>
                                    <TextField className='inputField'
                                        name='description'
                                        label="Descripton"
                                        multiline
                                        rows={4}
                                        placeholder=". . ."
                                        variant="outlined"
                                        helperText={formData.description.error && 'Description max length is 9999'}
                                        error={formData.description.error}
                                        value={formData.description.value}
                                        onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_DESCRIPTION, payload: e.target.value }) }}
                                        onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_DESCRIPTION, payload: e.target.value }) }}
                                    />
                                </div>

                            </div>
                        }
                        {Page === 5 &&
                            <div className='info-container'>
                                <h1> Set a price!</h1>
                                <div id='content-container'>
                                    <div id="price" className='inputField'>
                                        <TextField
                                            fullWidth
                                            name='price'
                                            label="Price"
                                            variant="standard"
                                            color="secondary"
                                            helperText={formData.price.error && 'Invalid'}
                                            error={formData.price.error}
                                            value={formData.price.value}
                                            onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_PRICE, payload: e.target.value }) }}
                                            onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_PRICE, payload: e.target.value }) }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                            }}
                                        />
                                    </div>
                                </div>

                            </div>
                        }
                        {Page === 6 &&
                            <div className='info-container'>
                                <h1>Upload some photos!</h1>
                                <div id='content-container'>
                                    <div ref={imagesContainerRef} className="drop-container">
                                        <span className="drop-title">All images are required</span>
                                        <input onChange={handleImageInputChange} name='image' type="file" accept="image/png, image/jpeg" required />
                                        <input onChange={handleImageInputChange} name='image' type="file" accept="image/png, image/jpeg" required />
                                        <input onChange={handleImageInputChange} name='image' type="file" accept="image/png, image/jpeg" required />
                                        <input onChange={handleImageInputChange} name='image' type="file" accept="image/png, image/jpeg" required />
                                    </div>
                                </div>

                            </div>
                        }
                        {Page === 7 &&
                            <div className='info-container'>
                                <h1>Mark the available extras!(If any!) </h1>
                                <div id='content-container'>
                                    <div className='property-filter-advanced-checkbox-row df fww'>
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
                                </div>
                                <div id='create-navigation'>
                                    <div className='button'>
                                        <Button fullWidth variant="contained" size='large' id='go-back-button' onClick={() => SetPage(old => old - 1)}> ◄ </Button>
                                    </div>
                                    <div className='button'>
                                        <Button fullWidth variant="contained" size='large' id='add-button' type='submit'>Publish listing</Button>
                                    </div>
                                </div>

                            </div>
                        }
                        {Page > 0 && Page < 7 &&
                            <div id='create-navigation'>
                                <div className='button'>
                                    <Button
                                        ref={goBackButtonRef}
                                        fullWidth
                                        variant="contained"
                                        size='large'
                                        id='go-back-button'
                                        onClick={handlePageChange.bind(null, Page - 1)}
                                    > ◄ </Button>
                                </div>
                                <div className='button continue-button'>
                                    <Button
                                        ref={continueButtonRef}
                                        fullWidth
                                        variant="contained"
                                        size='large'
                                        id='continue-button'
                                        onClick={handlePageChange.bind(null, Page + 1)}
                                    > Continue</Button>
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