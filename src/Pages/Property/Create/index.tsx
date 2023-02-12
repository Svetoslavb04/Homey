import './Create.scss';
import { FC, useState } from 'react';
import { NavLink } from "react-router-dom";

import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';




const AddProperty: FC = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowRePassword = () => setShowRePassword((show) => !show);

    const [registerTypeIsUser, setUserType] = useState(true);

    const changeRegisterTypeToAgency = () => {
        setUserType(false);
    }

    const changeRegisterTypeToUser = () => {
        setUserType(true);
    }


    return (

        <div id='image-background'>
            <div id='create-container'>
                <div className='add-form-wrapper'>
                    <form id='add-form'>
                        <h2>List property</h2>  
                        <div id='info-container'>

                            <div id='left-side'>
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
                                    />
                                </div>
                                <div id="number-bedrooms" className='inputField'>
                                    <TextField
                                        fullWidth
                                        label="Number of bedrooms"
                                        variant="standard"
                                        color="secondary"
                                        error={false}
                                    />
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
                                <div id="price" className='inputField'>
                                    <TextField
                                        fullWidth
                                        label="Price"
                                        variant="standard"
                                        color="secondary"
                                        error={false}
                                    />
                                </div> 
                                <div id="number-bathrooms" className='inputField'>
                                    <TextField
                                        fullWidth
                                        label="Number of bathrooms"
                                        variant="standard"
                                        color="secondary"
                                        error={false}
                                    />
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
                            <Button fullWidth variant="contained" size='large' id='add-button' type='submit'>Add</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}



export default AddProperty;