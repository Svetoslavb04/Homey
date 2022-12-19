import './Login.scss';
import { FC, useState } from 'react';

import UserIcon from '@mui/icons-material/AccountCircleOutlined';
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
        <div id='login-container'>
            <div id="login-user-logo-container">
                <UserIcon className='user-icon' fontSize="large" />
            </div>
            <form id='login-form'>
                <div id="login-username">
                    <TextField
                        fullWidth
                        label="Username"
                        variant="standard"
                        color="secondary"
                        error={false}
                    />
                </div>
                <div id="login-password">
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
                <div id='login-button-container'>
                    <Button fullWidth variant="contained" size='large' id='login-button' type='submit'>Login</Button>
                </div>
            </form>
        </div>
    )
}



export default Login;