import './Auth.scss';
import { FC, useState } from 'react';
import { NavLink } from "react-router-dom";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

const Login: FC = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <div id='image-background'>
            <div id='auth-container'>
                <div className='auth-form-wrapper'>
                    <form id='auth-form'>
                        <div id='choose-form'>
                            <NavLink to='/login' className='form-type'> SIGN IN </NavLink>

                            <NavLink to='/register' className='form-type'> SIGN UP </NavLink>
                        </div>

                        <div id="login-email" className='inputField'>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="standard"
                                color="secondary"
                                error={false}
                            />
                        </div>
                        <div id="login-password" className='inputPassword'>
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
                        <div id='auth-button-container'>
                            <Button fullWidth variant="contained" size='large' id='auth-button' type='submit'>Login</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}



export default Login;