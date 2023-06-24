import React, { useState, useEffect, useMemo } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";

import { Snackbar, Alert } from '@mui/material';
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
    const [ successOpen, setSuccessOpen ] = useState(false);

    const [ directions, setDirections ] = useState(null);
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

                        dispatch(setFrom({lat: latitude, lng: longitude}));
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

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccessOpen(false);
    };

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
                        directions={directions}
                        openSuccessMessage={() => setSuccessOpen(true)}
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
            <Snackbar 
                open={successOpen} 
                autoHideDuration={1000} 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={handleSuccessClose}
            >
                <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
                    Your route has been saved!
                </Alert>
            </Snackbar>
        </PageContainer>
    );
};

export default MapPage;