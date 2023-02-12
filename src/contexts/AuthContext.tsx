import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import Fade from '@mui/material/Fade';

import { Role } from '../enums/Role';

import { IAgency } from '../interfaces/IAgency';
import { IUser } from '../interfaces/IUser';
import { me } from '../services/authService';
import PageLoader from '../Components/Core/PageLoader';

export const initialUser = {
    role: Role.guest,
    _id: null
}

type AuthContextValue = {
    user: IUser | IAgency | typeof initialUser,
    setUser: (user: IUser | IAgency | typeof initialUser) => void
}

export const AuthContext = createContext<AuthContextValue>({
    user: initialUser,
    setUser() { }
});

type Props = {
    children: ReactNode
}

export const AuthProvider: FC<Props> = ({ children }) => {

    const [isUserLoaded, setIsUserLoaded] = useState(false);

    const [user, setUser] = useState<IUser | IAgency | typeof initialUser>(initialUser)

    useEffect(() => {

        me()
            .then(payload => {

                if (payload.status === 400) { setUser(initialUser) }
                if (payload.status === 200) { setUser(payload.user) }

                setTimeout(() => setIsUserLoaded(true), 500)
            })
            .catch(err => { console.log(err); setTimeout(() => setIsUserLoaded(true), 500) })

    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <Fade in={!isUserLoaded} unmountOnExit>
                <div>
                    <PageLoader />
                </div>
            </Fade>
            {isUserLoaded && children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);