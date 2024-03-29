import './Auth.scss';

import { FocusEvent, FC, FormEvent, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";

import { useAuthContext } from '../../contexts/AuthContext';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { login } from '../../services/authService';
import { useNotificationContext } from '../../contexts/NotificationContext/NotificationContext';

const Login: FC = () => {

    const navigate = useNavigate();

    const { popNotification } = useNotificationContext();
    const { updateUser } = useAuthContext()

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [email, setEmail] = useState({
        error: false,
        value: ''
    });
    const handleEmailChange = (e: FocusEvent<HTMLInputElement>) => {

        const value = e.target.value;

        if (value.trim().length < 5 && value !== '') {
            setEmail({ error: true, value: value })
        } else {
            setEmail({ error: false, value: value })
        }
    }

    const [password, setPassword] = useState({
        error: false,
        value: ''
    });
    const handlePasswordChange = (e: FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.trim().length < 8 && value !== '') {
            setPassword({ error: true, value: value })
        } else {
            setPassword({ error: false, value: value })
        }
    }

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (email.error || password.error) { return }

        login(email.value, password.value)
            .then(payload => {

                if (payload._id && payload.role) {

                    updateUser()
                    popNotification({ type: 'success', message: 'Succesfully logged in!' })
                    navigate('/', { replace: true })
                    
                } else if (payload.status !== 200) {
                    popNotification({ type: 'error', message: 'Invalid email or password!' })
                }

            })
            .catch(err => console.log(err))

    }

    return (
        <div id='image-background'>
            <div id='auth-container'>
                <div className='auth-form-wrapper'>
                    <form id='auth-form' onSubmit={handleFormSubmit}>
                        <div id='choose-form'>
                            <NavLink to='/login' className='form-type'> SIGN IN </NavLink>
                            <NavLink to='/register' className='form-type'> SIGN UP </NavLink>
                        </div>

                        <div id="login-email" className='inputField'>
                            <TextField
                                fullWidth
                                label="Email"
                                helperText={email.error && "Invalid Email"}
                                variant="standard"
                                color="primary"
                                error={email.error}
                                value={email.value}
                                onChange={(e) => { setEmail(p => ({ ...p, value: e.target.value })) }}
                                onBlur={handleEmailChange}
                            />
                        </div>
                        <div id="login-password" className='inputPassword'>
                            <TextField
                                fullWidth
                                label="Password"
                                variant="standard"
                                color="primary"
                                helperText={password.error && "Password should be at least 8 characters"}
                                error={password.error}
                                value={password.value}
                                onChange={(e) => { setPassword(p => ({ ...p, value: e.target.value })) }}
                                onBlur={handlePasswordChange}
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