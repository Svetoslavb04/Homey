import { Routes, Route } from 'react-router-dom';
import Page404 from '../Pages/404';
import Home from '../Pages/Home';
import Property from '../Pages/Property';

const RoutesList = () => {
    return (
        <Routes>
            <Route index path='/' element={<Home />} />
            <Route path='/properties/:propertyId' element={<Property/>}/>
            <Route path='/*' element={<Page404/>}/>
        </Routes>
    )
}

export default RoutesList