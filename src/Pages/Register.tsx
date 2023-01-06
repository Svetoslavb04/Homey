import './Login.scss';
import { FC, useState } from 'react';
import { NavLink } from "react-router-dom";

import UserIcon from '@mui/icons-material/AccountCircleOutlined';
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




const Register: FC = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <div id='login-container'>
            <div id="login-user-logo-container">
                <UserIcon className='user-icon' fontSize="large" />
            </div>
            <form id='login-form'>
                <div id='choose-form'>
                    <NavLink to='/login' className='form-type'> SIGN IN </NavLink>
                        
                    <NavLink to='/register' className='form-type'> SIGN UP </NavLink>                 
                </div>
                
                <h2>SIGN UP AS</h2>
                <div className='register-mode'>
                    <div className='register-mode-option'>
                         <h3>USER</h3>
                         <div className='register-mode-icon-container'> <PersonIcon className='register-mode-icon'/> </div>
                    </div>

                    <div className='register-mode-option'>
                         <h3>AGENCY</h3>
                         <div className='register-mode-icon-container'> <GroupsIcon className='register-mode-icon'/> </div>
                    </div>
                </div>


                <div id="register-username" className='inputField'>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="standard"
                        color="secondary"
                        error={false}
                    />
                </div>
                <div id="register-email" className='inputField'>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="standard"
                        color="secondary"
                        error={false}
                    />
                </div>
                <div id="register-password" className='inputPassword'>
                    <FormControl fullWidth variant="standard" color="secondary">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end" className='password-visibilty-icon'>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div id="register-rePassword" className='inputPassword'>
                    <FormControl fullWidth variant="standard" color="secondary">
                        <InputLabel htmlFor="standard-adornment-password">Repeat Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end" className='password-visibilty-icon'>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div id='login-button-container'>
                    <Button fullWidth variant="contained" size='large' id='login-button' type='submit'>Register</Button>
                </div>
            </form>
        </div>
    )
}



export default Register;