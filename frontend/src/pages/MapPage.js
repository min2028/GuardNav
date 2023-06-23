import React, { useState, useEffect, useMemo } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";

import { Map, PageContainer, SideNavBar, RouteDrawer, LoadingSpinner } from "../components";
import { setCurrentPosition, resetLocation } from "../reducers/LocationReducer";
import { setFrom, setTo } from "../reducers/TripReducer";

const MapPage = () => {
    const dispatch = useDispatch();
    const [ libraries ] = useState(['places', 'routes']);
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
        libraries,
    });

    const from = useSelector(state => state.trip.from);
    const to = useSelector(state => state.trip.to);

    const [ routeDrawerOpen, setRouteDrawerOpen ] = useState(false);
    const [ option, setOption ] = useState('safest');

    const [directions, setDirections] = useState(null);
    let count = React.useRef(0);

    const directionsServiceOptions = {
        destination: { 
            lat: to?.lat || 0,
            lng: to?.lng || 0
        },
        origin: {
            lat: from?.lat,
            lng: from?.lng
        },
        travelMode: 'WALKING',
    }

    const directionsCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK' && count.current < 2) {
                count.current++;
                setDirections(response);
            } else {
                count.current = 0;
                console.log('response: ', response);
            }
        }
    };

    useEffect(() => {
        const getCurrentPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const {latitude, longitude} = position.coords;
                        dispatch(setCurrentPosition({lat: latitude, lng: longitude}));

                        const userLocation = {
                            lat: latitude,
                            lng: longitude,
                            formatted_address: "Your Location"
                        }
                        dispatch(setFrom(userLocation))
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

    const openRouteDrawer = () => {
        setRouteDrawerOpen(true);
    };

    const {currentPosition} = useSelector(
        (state) => state.location
    );

    return (
        <PageContainer>
            {!isLoaded || !currentPosition ? <LoadingSpinner /> : (
                <>
                    <SideNavBar/>   
                    <RouteDrawer 
                        open={routeDrawerOpen} 
                        onClose={() => {
                            setTo(null)
                            setRouteDrawerOpen(false)
                        }}
                        option={option}
                        setOption={setOption}
                        isLoaded={isLoaded}
                    />
                    <Map 
                        openRouteDrawer={openRouteDrawer} 
                        isLoaded={isLoaded} 
                        isRouteDrawerOpen={routeDrawerOpen} 
                        directions={directions}
                        directionsServiceOptions={directionsServiceOptions}
                        directionsCallback={directionsCallback}
                    />
                </>
            )}
        </PageContainer>
    );
};

export default MapPage;