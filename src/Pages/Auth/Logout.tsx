import { useEffect } from 'react'

import { useNavigate } from 'react-router'
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext } from '../../contexts/NotificationContext/NotificationContext';

import { logout } from '../../services/authService';

const Logout = () => {

    const navigate = useNavigate();
    
    const { popNotification } = useNotificationContext();
    const { updateUser } = useAuthContext();

    useEffect(() => {

        navigate('/', { replace: true });
        popNotification({ type: 'success', message: 'Successfully logged out!'})
        
        logout()
            .then(() => updateUser())
            .catch(err => console.log(err))
            
    }, [navigate, updateUser, popNotification])

    return (
        <>
        </>
    )
}

export default Logout