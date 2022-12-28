import './Sidebar.scss';
import { FC, useEffect, useState } from 'react';

import { NavLink } from "react-router-dom";

import { Role } from '../../../enums/Role';

import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

interface INavLink {
    to: string,
    text: string,
    visibleTo: Role[]
}

const Sidebar: FC = () => {

    const [isOpened, setIsOpened] = useState<boolean>(true);

    useEffect(() => { document.body.toggleAttribute('sidebar-hidden', !isOpened) }, [isOpened])
    
    const role: Role = Role.agency //get from somewhere

    const navLinks: INavLink[] = [
        { to: '/', text: 'Home', visibleTo: [Role.guest, Role.buyer, Role.agency] },
        { to: '/profile', text: 'My Profile', visibleTo: [Role.buyer, Role.agency] },
        { to: '/properties', text: 'Properties', visibleTo: [Role.guest, Role.buyer, Role.agency] },
        { to: '/properties/add', text: 'Add Property', visibleTo: [Role.agency] },
        { to: '/agencies', text: 'Agencies', visibleTo: [Role.guest, Role.buyer, Role.agency] },
        { to: '/login', text: 'Login', visibleTo: [Role.guest] },
        { to: '/register', text: 'Register', visibleTo: [Role.guest] },
        { to: '/logout', text: 'Logout', visibleTo: [Role.buyer, Role.agency] },
    ]
        .filter(link => link.visibleTo.includes(role))

    return (
        <div id='sidebar' className={`${!isOpened ? 'hidden' : ''}`}>
            <div id="sidebar-logo">
                <HouseSidingIcon fontSize='large' />
                <h2 id='sidebar-logo-text'>Homey</h2>
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