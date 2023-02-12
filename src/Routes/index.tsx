import { Routes, Route } from 'react-router-dom';

import Login from '../Pages/Auth/Login';
import Logout from '../Pages/Auth/Logout';
import Register from '../Pages/Auth/Register';
import Home from '../Pages/Home';
import PropertiesListing from '../Pages/Property/Listing';

const RoutesList = () => {
    return (
        <Routes>
            <Route element={<Login />} path='/login' />
            <Route element={<Logout />} path='/logout' />
            <Route element={<Register />} path='/register' />
            <Route index path='/' element={<Home />} />
            <Route index path='/properties' element={<PropertiesListing />} />
        </Routes>
    )
}

export default RoutesList