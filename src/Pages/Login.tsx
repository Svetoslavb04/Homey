import './Login.scss';
import React from 'react';
import {FC} from 'react';
import UserIcon from '@mui/icons-material/AccountCircleOutlined';

const Login:FC= () => {
  return (
    <div className='login-container'>
        <UserIcon className='user-icon' fontSize="large"/>
         <h1>Login</h1> 
    </div>
  )
}

export default Login;