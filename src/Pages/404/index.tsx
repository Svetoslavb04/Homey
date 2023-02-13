import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import './404.scss';

const FourOFour = () => {
    return (
        <div className='four-o-four-container'>
            <section className='four-o-four-image-container' style={{ backgroundImage: `url(/assets/images/modern_house_3.jpg)` }}>
                <h1 className='four-o-four-heading'>PAGE NOT FOUND</h1>
            </section>
            <hr className='four-o-four-vertical-line'/>
            <section className='four-o-four-heading-container'>
                <div className='df fdc four-o-four-big-heading-wrapper'>
                    <h1 className='four-o-four-big-heading'>404</h1>
                    <h2 className='four-o-four-big-sub-heading'>Sorry we can't find that page!</h2>
                </div>
                <div className='four-o-four-big-back-home-wrapper'>
                    <NavLink to='/'>
                        <Button variant="outlined" color='secondary' className='four-o-four-big-back-home'>Back to home</Button>
                    </NavLink>
                </div>
            </section>
        </div >
    )
}

export default FourOFour