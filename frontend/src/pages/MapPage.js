import React, { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";

import { Map, PageContainer, SideNavBar, RouteDrawer, LoadingSpinner } from "../components";
import { setCurrentPosition, resetLocation } from "../reducers/LocationReducer";

const MapPage = () => {
    const dispatch = useDispatch();
    const [ libraries ] = useState(['places']);
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
        libraries,
    });

    const [ routeDrawerOpen, setRouteDrawerOpen ] = useState(false);
    const [ option, setOption ] = useState('safest');

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
                        onClose={() => setRouteDrawerOpen(false)}
                        option={option}
                        setOption={setOption}
                        isLoaded={isLoaded}
                    />
                    <Map openRouteDrawer={openRouteDrawer} isLoaded={isLoaded} isRouteDrawerOpen={routeDrawerOpen} />
                </>
            )}
        </PageContainer>
    );
};

export default MapPage;