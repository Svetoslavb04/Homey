import { Routes, Route } from 'react-router-dom';
import Authenticated from './Authenticated';

import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Home from '../Pages/Home';
import PropertiesListing from '../Pages/Property/Listing';
import Logout from '../Pages/Auth/Logout';
import FourOFour from '../Pages/404';

const RoutesList = () => {
    return (
        <Routes>
            <Route element={<Login />} path='/login' />
            <Route element={<Authenticated><Logout /></Authenticated>} path='/logout' />
            <Route element={<Register />} path='/register' />
            <Route index path='/' element={<Home />} />
            <Route path='/properties' element={<PropertiesListing />} />
            <Route path='*' element={<FourOFour />} />
        </Routes>
    )
}

export default RoutesList