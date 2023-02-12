import { useEffect } from 'react'

import { useNavigate } from 'react-router'
import { initialUser, useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext } from '../../contexts/NotificationContext/NotificationContext';

import { logout } from '../../services/authService';

const Logout = () => {

    const navigate = useNavigate();
    
    const { popNotification } = useNotificationContext();
    const { setUser } = useAuthContext();

    useEffect(() => {

        navigate('/', { replace: true });
        popNotification({ type: 'success', message: 'Successfully logged out!'})
        
        logout()
            .then(() => setUser(initialUser))
            .catch(err => console.log(err))
            
    }, [navigate, setUser, popNotification])

    return (
        <>
        </>
    )
}

export default Logout