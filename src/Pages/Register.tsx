import './Login.scss';
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




const Register: FC = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowRePassword = () => setShowRePassword((show) => !show);

    const [registerTypeIsUser, setUserType] = useState(true);

    const changeRegisterTypeToAgency = () =>{ 
        setUserType(false);
   }

   const changeRegisterTypeToUser = () =>{ 
    setUserType(true);
}


    return (

        <div id='image-background'>   
                <div id='auth-container'>
                    <form id='auth-form'>
                        <div id='choose-form'>
                            <NavLink to='/login' className='form-type'> SIGN IN </NavLink>
                            
                            <NavLink to='/register' className='form-type'> SIGN UP </NavLink>                 
                        </div>
                        
                        <h2>CREATE ACCOUNT</h2>
                        <div className='register-mode'>
                            <div className='register-mode-option'>
                                <div className={registerTypeIsUser ? 'register-mode-icon-container-active' : 'register-mode-icon-container'} 
                                    onClick={changeRegisterTypeToUser}
                                > 
                                    <PersonIcon className='register-mode-icon'/> 
                                    <h3>USER</h3> 
                                </div>
                            </div>

                            <div className='register-mode-option'>
                                <div  className={!registerTypeIsUser ? 'register-mode-icon-container-active' : 'register-mode-icon-container'} 
                                    onClick={changeRegisterTypeToAgency}
                                > 
                                    <GroupsIcon className='register-mode-icon'/> 
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
                                error={false}
                            />
                        </div>
                        

                        {registerTypeIsUser
                        
                            ?   <>
                                    <div id="register-firstName" className='inputField'>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            variant="standard"
                                            color="secondary"
                                            error={false}
                                        />
                                    </div>

                                    <div id="register-lastName" className='inputField'>
                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            variant="standard"
                                            color="secondary"
                                            error={false}
                                        />
                                    </div>
                                </>

                            :   <>
                                    <div id="register-agencyName" className='inputField'>
                                        <TextField
                                            fullWidth
                                            label="Agency Name"
                                            variant="standard"
                                            color="secondary"
                                            error={false}
                                        />
                                    </div>
                                    <div id="register-agencyCity" className='inputField'>
                                        <TextField
                                            fullWidth
                                            label="City"
                                            variant="standard"
                                            color="secondary"
                                            error={false}
                                        />
                                    </div>
                                    <div id="register-agencyAdress" className='inputField'>
                                        <TextField
                                            fullWidth
                                            label="Adress"
                                            variant="standard"
                                            color="secondary"
                                            error={false}
                                        />
                                    </div>
                                </>
                        }
                        
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
                                    type={showRePassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end" className='password-visibilty-icon'>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowRePassword}
                                            >
                                                {showRePassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
                        <div id='auth-button-container'>
                            <Button fullWidth variant="contained" size='large' id='auth-button' type='submit'>Register</Button>
                        </div>
                    </form>
                </div>
            </div>  
    )
}



export default Register;