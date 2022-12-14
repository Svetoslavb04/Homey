import './Layout.scss';

import RoutesList from '../../../Routes'
import Sidebar from '../Sidebar'

const Layout = () => {
    return (
        <div id='App' className='App'>
            <Sidebar />
            <div id='main'>
                <RoutesList />
                {/*Footer */}
            </div>
        </div>
    )
}

export default Layout