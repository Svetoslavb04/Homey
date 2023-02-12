import { Routes, Route, createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import PropertiesListing from '../Pages/Property/Listing';
import AddProperty from '../Pages/Property/Create';

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
            <Route 
                element = {<AddProperty/>} 
                path='/properties/add'
            />
            <Route index path='/' element={<Home />} />
            <Route index path='/properties' element={<PropertiesListing />} />
        </Routes>
    )
}

export default RoutesList