import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { homeyAPI } from '../assets/js/APIs';

import { Role } from '../enums/Role';

import { IAgency } from '../interfaces/IAgency';
import { IUser } from '../interfaces/IUser';

const initialUser = {
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

    const [user, setUser] = useState<IUser | IAgency | typeof initialUser>(initialUser)

    useEffect(() => {

        fetch(homeyAPI.me, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(payload => {

                if (payload.status === 400) { setUser(initialUser) }
            })
            .catch(err => console.log(err))

    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);