import { Routes, Route, createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import PropertiesListing from '../Pages/Property/Listing';
import Edit from '../Pages/Property/Edit';

const RoutesList = () => {
    return (
        <Routes>
            <Route 
                element = {<Login/>} 
                path='/login'
            />
            <Route 
                element = {<Register/>} 
                path='/register'
            />
            <Route index path='/' element={<Home />} />
            <Route index path='/properties' element={<PropertiesListing />} />
            <Route index path='/properties/:propertyId/edit' element={<Edit />} />
        </Routes>
    )
}

export default RoutesList