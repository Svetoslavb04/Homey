import './Sidebar.scss';
import { FC, useEffect, useState } from 'react';

import { NavLink } from "react-router-dom";

import { Role } from '../../../enums/Role';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import { usePubSubContext } from '../../../contexts/PubSubContext';
import { customEvents } from '../../../utils/pubsub';

import { useAuthContext } from '../../../contexts/AuthContext';

interface INavLink {
    to: string,
    text: string,
    visibleTo: Role[]
}

const Sidebar: FC = () => {

    const eventBus = usePubSubContext();
    const { user } = useAuthContext();

    const [isOpened, setIsOpened] = useState<boolean>(true);

    useEffect(() => {

        document.body.toggleAttribute('sidebar-hidden', !isOpened)

        eventBus?.publish(customEvents.sidebarStateChange)

    }, [isOpened, eventBus])

    const role: Role = user.role//get from somewhere

    const navLinks: INavLink[] = [
        { to: '/', text: 'Home', visibleTo: [Role.guest, Role.user, Role.agency] },
        { to: '/profile', text: 'My Profile', visibleTo: [Role.user, Role.agency] },
        { to: '/properties', text: 'Properties', visibleTo: [Role.guest, Role.user, Role.agency] },
        { to: '/properties/add', text: 'Add Property', visibleTo: [Role.agency] },
        { to: '/agencies', text: 'Agencies', visibleTo: [Role.guest, Role.user, Role.agency] },
        { to: '/login', text: 'Login', visibleTo: [Role.guest] },
        { to: '/register', text: 'Register', visibleTo: [Role.guest] },
        { to: '/logout', text: 'Logout', visibleTo: [Role.user, Role.agency] },
    ]
        .filter(link => link.visibleTo.includes(role))

    useEffect(
        () => { document.body.toggleAttribute('sidebar-opened', isOpened) }
        , [isOpened]
    );

    return (
        <div id='sidebar' className={`${!isOpened ? 'hidden' : ''}`}>
            <div id="sidebar-logo">
                <img src="/assets/images/logo.png" alt="" />
            </div>
            <nav>
                <ul>
                    {navLinks.map(link =>
                        <li key={link.to}>
                            <NavLink to={link.to}>{link.text}</NavLink>
                        </li>
                    )}
                </ul>
            </nav>
            <div
                id="sidebar-toggler"
                onClick={() => setIsOpened(isOpened => !isOpened)}
            >
                {
                    isOpened
                        ? <CloseIcon fontSize='large' />
                        : <MenuIcon fontSize='large' />
                }
            </div>
        </div>
    )
}

export default Sidebar