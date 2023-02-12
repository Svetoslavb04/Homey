import { useEffect } from 'react'

import { useNavigate } from 'react-router'
import { initialUser, useAuthContext } from '../../contexts/AuthContext';

import { logout } from '../../services/authService';
import Home from '../Home';

const Logout = () => {

    const navigate = useNavigate();

    const { setUser } = useAuthContext();

    useEffect(() => {

        navigate('/', { replace: true });

        logout()
            .then(() => setUser(initialUser))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
        </>
    )
}

export default Logout