import { Routes, Route, createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';

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
        </Routes>
    )
}

export default RoutesList