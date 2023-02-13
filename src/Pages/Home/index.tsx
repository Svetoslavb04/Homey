import './Home.scss';
import { FC, MouseEvent, useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";

import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VillaIcon from '@mui/icons-material/Villa';
import LandscapeIcon from '@mui/icons-material/Landscape';

import HomeSlideShow from './Components/HomeSlideShow';
import HomePropertyTypeCard, { HomePropertyTypeCardProps } from './Components/HomePropertyTypeCard';
import PropertyCard, { IPropertyCard } from '../../Components/PropertyCard';

import { getTop } from '../../services/propertyService';

import { homeyAPI } from '../../assets/js/APIs';
import LocalLoader from '../../Components/LocalLoader';

const Home: FC = () => {

    const navigate = useNavigate();

    const [propertiesLoaded, setPropertiesLoaded] = useState<boolean>(false);
    const [topProperties, setTopProperties] = useState<IPropertyCard[] | null>(null);

    useEffect(() => {

        getTop(6)
            .then(payload => {

                const topProperties: IPropertyCard[] = payload.properties.map((p: any) => {
                    const propertyCard: IPropertyCard = {
                        id: p._id,
                        name: p.name,
                        town: p.city,
                        image: {
                            src: `${homeyAPI.images.baseURL}/${p.images[0]}`,
                            alt: 'property'
                        }
                    }

                    return propertyCard
                })

                setTopProperties(topProperties)
            })
    }, [])

    useEffect(() => {
        if (!propertiesLoaded && topProperties) { setPropertiesLoaded(true) }
    }, [topProperties, propertiesLoaded])

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

    const handleTopPropertyClick = (e: MouseEvent<HTMLDivElement>, id: string) => { navigate(`/properties/${id}`); }

    return (
        <div id='home-container'>
            <HomeSlideShow />
            <div id='home-property-cards'>
                {
                    propertyCards.map((pc, i) =>
                        <HomePropertyTypeCard key={pc.type + i} Icon={pc.Icon} type={pc.type} />
                    )
                }
            </div>
            <div id="home-top-properties">
                <h2>Our top picks</h2>
                <div id='home-top-properties-container'>
                    {!propertiesLoaded && <LocalLoader />}
                    <div id='home-top-properties-left'>
                        {
                            topProperties?.slice(0, 3)
                                .map((prop, i) =>
                                    <PropertyCard
                                        key={`${prop.name + prop.town + prop.image.src + i}`}
                                        id={prop.id}
                                        image={prop.image}
                                        town={prop.town}
                                        name={prop.name}
                                        handleImageClick={handleTopPropertyClick}
                                    />
                                )
                        }
                    </div>
                    <div id='home-top-properties-right'>
                        {
                            topProperties?.slice(3)
                                .map((prop, i) =>
                                    <PropertyCard
                                        key={`${prop.name + prop.town + prop.image.src + i}`}
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