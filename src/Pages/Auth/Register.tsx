import './Auth.scss';
import { FC, FormEvent, useState } from 'react';

import { NavLink } from "react-router-dom";

import { ActionTypes, FormDataMode, useRegisterFormData } from './useRegisterFormData';

import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

const Register: FC = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowRePassword = () => setShowRePassword((show) => !show);

    const [formData, dispatch] = useRegisterFormData();

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    return (

        <div id='image-background'>
            <div id='auth-container'>
                <div className='auth-form-wrapper auth-register-form-wrapper'>
                    <form id='auth-form' onSubmit={handleFormSubmit}>
                        <div id='choose-form'>
                            <NavLink to='/login' className='form-type'> SIGN IN </NavLink>
                            <NavLink to='/register' className='form-type'> SIGN UP </NavLink>
                        </div>
                        <h2>CREATE ACCOUNT</h2>
                        <div className='register-mode'>
                            <div className='register-mode-option'>
                                <div
                                    className={formData.mode === FormDataMode.user ? 'register-mode-icon-container-active' : 'register-mode-icon-container'}
                                    onClick={dispatch.bind(null, { type: ActionTypes.CHANGE_MODE, payload: FormDataMode.user })}
                                >
                                    <PersonIcon className='register-mode-icon' />
                                    <h3>USER</h3>
                                </div>
                            </div>
                            <div className='register-mode-option'>
                                <div
                                    className={formData.mode === FormDataMode.agency ? 'register-mode-icon-container-active' : 'register-mode-icon-container'}
                                    onClick={dispatch.bind(null, { type: ActionTypes.CHANGE_MODE, payload: FormDataMode.agency })}
                                >
                                    <GroupsIcon className='register-mode-icon' />
                                    <h3>AGENCY</h3>
                                </div>
                            </div>
                        </div>
                        <div id="register-email" className='inputField'>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="standard"
                                color="secondary"
                                helperText={formData.email.error && "Invalid Email"}
                                error={formData.email.error}
                                value={formData.email.value}
                                onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_EMAIL, payload: e.target.value }) }}
                                onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_EMAIL, payload: e.target.value }) }}
                            />
                        </div>
                        {formData.mode === FormDataMode.user
                            ? <>
                                <div id="register-firstName" className='inputField'>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        variant="standard"
                                        color="secondary"
                                        helperText={formData.firstName.error && "First name should be at least 2 characters long!"}
                                        error={formData.firstName.error}
                                        value={formData.firstName.value}
                                        onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_FIRSTNAME, payload: e.target.value }) }}
                                        onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_FIRSTNAME, payload: e.target.value }) }}
                                    />
                                </div>
                                <div id="register-lastName" className='inputField'>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        variant="standard"
                                        color="secondary"
                                        helperText={formData.lastName.error && "Last name should be at least 2 characters long!"}
                                        error={formData.lastName.error}
                                        value={formData.lastName.value}
                                        onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_LASTNAME, payload: e.target.value }) }}
                                        onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_LASTNAME, payload: e.target.value }) }}
                                    />
                                </div>
                            </>
                            : <>
                                <div id="register-agencyName" className='inputField'>
                                    <TextField
                                        fullWidth
                                        label="Agency Name"
                                        variant="standard"
                                        color="secondary"
                                        helperText={formData.agencyName.error && "Agency name should be at least 2 characters long!"}
                                        error={formData.agencyName.error}
                                        value={formData.agencyName.value}
                                        onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_AGENCYNAME, payload: e.target.value }) }}
                                        onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_AGENCYNAME, payload: e.target.value }) }}
                                    />
                                </div>
                                <div id="register-agencyCity" className='inputField'>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        variant="standard"
                                        color="secondary"
                                        helperText={formData.city.error && "City should be at least 3 characters long!"}
                                        error={formData.city.error}
                                        value={formData.city.value}
                                        onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_CITY, payload: e.target.value }) }}
                                        onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_CITY, payload: e.target.value }) }}
                                    />
                                </div>
                                <div id="register-agencyAddress" className='inputField'>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        variant="standard"
                                        color="secondary"
                                        helperText={formData.address.error && "Address should be at least 3 characters long!"}
                                        error={formData.address.error}
                                        value={formData.address.value}
                                        onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_ADDRESS, payload: e.target.value }) }}
                                        onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_ADDRESS, payload: e.target.value }) }}
                                    />
                                </div>
                            </>
                        }
                        <div id="register-password" className='inputPassword'>
                            <TextField
                                fullWidth
                                label="Password"
                                variant="standard"
                                color="secondary"
                                helperText={formData.password.error && "Password should be at least 8 characters"}
                                error={formData.password.error}
                                value={formData.password.value}
                                onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_PASSWORD, payload: e.target.value }) }}
                                onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_PASSWORD, payload: e.target.value }) }}
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" className='password-visibilty-icon'>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                        <div id="register-rePassword" className='inputPassword'>
                            <TextField
                                fullWidth
                                label="Repeat Password"
                                variant="standard"
                                color="secondary"
                                helperText={formData.rePassword.error && "Passwords do not match"}
                                error={formData.rePassword.error}
                                value={formData.rePassword.value}
                                onChange={(e) => { dispatch({ type: ActionTypes.CHANGE_REPASSWORD, payload: e.target.value }) }}
                                onBlur={(e) => { dispatch({ type: ActionTypes.VALIDATE_REPASSWORD, payload: e.target.value }) }}
                                type={showRePassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" className='password-visibilty-icon'>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowRePassword}
                                            >
                                                {showRePassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                        <div id='auth-button-container'>
                            <Button fullWidth variant="contained" size='large' id='auth-button' type='submit'>Register</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}



export default Register;