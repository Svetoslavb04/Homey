import { FC, ReactNode } from 'react'

import { Navigate } from 'react-router';

import { Role } from '../../enums/Role';

import { useAuthContext } from '../../contexts/AuthContext'
import { useNotificationContext } from '../../contexts/NotificationContext/NotificationContext';

const Authenticated: FC<{ children: ReactNode }> = ({ children }) => {

    const { user } = useAuthContext();
    const { popNotification } = useNotificationContext();

    if (user.role === Role.guest) {

        setTimeout(() => {
            
            popNotification({ type: 'error', message: 'You are not logged in!' });

        });

        return <Navigate to='/login' replace />;

    }
    return (
        <>
            {children}
        </>
    )
}

export default Authenticated