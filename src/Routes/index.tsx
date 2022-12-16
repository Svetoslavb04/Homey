import { Routes, Route, createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login';

const RoutesList = () => {
    return (
        <Routes>
            <Route 
                element = {<Login/>} 
                path='/login'
            />
        </Routes>
    )
}

export default RoutesList