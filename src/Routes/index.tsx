import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';

const RoutesList = () => {
    return (
        <Routes>
            <Route index path='/' element={<Home />} />
        </Routes>
    )
}

export default RoutesList