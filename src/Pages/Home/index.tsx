import './Home.scss';
import { FC, MouseEvent } from 'react';

import { useNavigate } from "react-router-dom";

import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VillaIcon from '@mui/icons-material/Villa';
import LandscapeIcon from '@mui/icons-material/Landscape';

import HomeSlideShow from './Components/HomeSlideShow';
import HomePropertyTypeCard, { HomePropertyTypeCardProps } from './Components/HomePropertyTypeCard';
import PropertyCard, { IPropertyCard } from '../../Components/PropertyCard';

const Home: FC = () => {

    const navigate = useNavigate();

    const propertyCards: HomePropertyTypeCardProps[] = [
        {
            Icon: HouseIcon,
            type: 'Houses'
        },
        {
            Icon: ApartmentIcon,
            type: 'Apartments'
        },
        {
            Icon: VillaIcon,
            type: 'Villas'
        },
        {
            Icon: LandscapeIcon,
            type: 'Landfields'
        }
    ]
    
    //Fetch top properties
    const topProperties: IPropertyCard[] = [
        {
            id: '1',
            image: {
                src: 'assets/images/modern_house_1.jpg',
                alt: 'house'
            },
            town: 'Sofia',
            name: 'Modern House'
        }, {
            id: '2',
            image: {
                src: 'assets/images/modern_house_2.jpg',
                alt: 'house'
            },
            town: 'Sofia',
            name: 'Modern House'
        }, {
            id: '3',
            image: {
                src: 'assets/images/modern_house_3.jpg',
                alt: 'house'
            },
            town: 'Sofia',
            name: 'Modern House'
        }, {
            id: '4',
            image: {
                src: 'assets/images/modern_house_4.jpg',
                alt: 'house'
            },
            town: 'Sofia',
            name: 'Modern House'
        }, {
            id: '5',
            image: {
                src: 'assets/images/modern_house_7.jpg',
                alt: 'house'
            },
            town: 'Sofia',
            name: 'Modern House'
        }, {
            id: '6',
            image: {
                src: 'assets/images/modern_house_8.jpg',
                alt: 'house'
            },
            town: 'Sofia',
            name: 'Modern House'
        }
    ]

    const handleTopPropertyClick = (e: MouseEvent<HTMLDivElement>, id: string) => {

        navigate(`/properties/${id}`);

    }

    return (
        <div id='home-container'>
            <HomeSlideShow />
            <div id='home-property-cards'>
                {
                    propertyCards.map(pc =>
                        <HomePropertyTypeCard key={pc.type} Icon={pc.Icon} type={pc.type} />
                    )
                }
            </div>
            <div id="home-top-properties">
                <h2>Our top picks</h2>
                <div id='home-top-properties-container'>
                    <div>
                        {
                            topProperties.slice(0, 3)
                                .map(prop =>
                                    <PropertyCard
                                        key={`${prop.name + prop.town + prop.image.src}`}
                                        id={prop.id}
                                        image={prop.image}
                                        town={prop.town}
                                        name={prop.name}
                                        handleImageClick={handleTopPropertyClick}
                                    />
                                )
                        }
                    </div>
                    <div>
                        {
                            topProperties.slice(3)
                                .map(prop =>
                                    <PropertyCard
                                        key={`${prop.name + prop.town + prop.image.src}`}
                                        id={prop.id}
                                        image={prop.image}
                                        town={prop.town}
                                        name={prop.name}
                                        handleImageClick={handleTopPropertyClick}
                                    />
                                )
                        }
                    </div>
                </div>
            </div>
            <div id='home-mission'>
                <h2>Our Mission</h2>
                <p>Finding a property buyer is not easy, nor is choosing your next home. That is why we have brought both parties under one roof here to facilitate their task.
                </p>
            </div>
        </div >
    )
}

export default Home;