import React, {useEffect, useState} from 'react';
import {useJsApiLoader, GoogleMap, Marker} from '@react-google-maps/api';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentPosition, resetLocation} from '../reducers/LocationReducer';
import PageContainer from './PageContainer';
import LoadingSpinner from './LoadingSpinner';
import WeatherInformation from './WeatherInformation';
import {styled, useTheme} from "@mui/material/styles";
import styleComp from '@emotion/styled';

import { SideNavBar, SearchBar, HistoryCard, RouteDrawer } from './index';

const drawerWidth = 240;

const MapTopContainer = styleComp.div`
    display: flex;
    align-items: start;
`;

const MapTopLeft = styleComp.div`
    display: flex;
    justify-content: start;
    width: 50%;
`;

const MapSearch = styleComp.div`
    display: flex;
    flex-flow: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    margin-left: ${({ theme }) => `${theme.margins.values.marginSides}`};
    width: 60%;
    padding: ${({ theme }) => `${theme.margins.values.marginSides} ${theme.margins.values.marginTopBottom}`};
`;

const MapTopRight = styleComp.div`
    display: flex;
    justify-content: start;
    padding: ${({ theme }) => `${theme.margins.values.marginSides} ${theme.margins.values.marginTopBottom}`};
`;

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Map = () => {
    const theme = useTheme();
    const [ routeDrawerOpen, setRouteDrawerOpen ] = useState(false);
    const [ option, setOption ] = useState('safest');

    const dispatch = useDispatch();
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
        libraries: ['places'],
    });

    const {currentPosition} = useSelector(
        (state) => state.location
    );

    useEffect(() => {
        const getCurrentPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const {latitude, longitude} = position.coords;
                        dispatch(setCurrentPosition({lat: latitude, lng: longitude}));
                    },
                    (error) => {
                        console.log(error);
                        dispatch(resetLocation());
                    }
                );
            } else {
                console.log('Geolocation is not supported by this browser.');
                dispatch(resetLocation());
            }
        };

        getCurrentPosition();
    }, [dispatch]);

    const handleRouteHistoryClick = () => {
        setRouteDrawerOpen(true);
    };

    return (
        <PageContainer>
            {isLoaded && currentPosition ? (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {currentPosition && (
                        <GoogleMap
                            mapContainerStyle={{
                                width: '100%',
                                height: '100%',
                            }}
                            zoom={16}
                            center={currentPosition}
                            options={{
                                disableDefaultUI: true,
                                zoomControl: true,
                                rotateControl: true,
                            }}
                        >
                            <MapTopContainer>
                                <SideNavBar/>   
                                <MapTopLeft>
                                    <MapSearch drawerOpen={true}>
                                        <SearchBar />
                                        <HistoryCard onClick={handleRouteHistoryClick} />
                                        <HistoryCard onClick={handleRouteHistoryClick} />
                                        <HistoryCard onClick={handleRouteHistoryClick} />
                                    </MapSearch>
                                    <RouteDrawer 
                                        open={routeDrawerOpen} 
                                        onClose={() => setRouteDrawerOpen(false)}
                                        option={option}
                                        setOption={setOption}
                                    />
                                </MapTopLeft>
                                <MapTopRight>
                                    <WeatherInformation/>
                                </MapTopRight>
                                <Marker position={currentPosition}/>
                            </MapTopContainer>
                        </GoogleMap>
                    )}
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </PageContainer>
    );
};

export default Map;
