import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import PropertiesListing from '../Pages/Property/Listing';

const RoutesList = () => {
    return (
        <Routes>
            <Route index path='/' element={<Home />} />
            <Route index path='/properties' element={<PropertiesListing />} />
        </Routes>
    )
}

export default RoutesList