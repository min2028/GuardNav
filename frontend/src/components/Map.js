import React, {useEffect, useState} from 'react';
import {useJsApiLoader, GoogleMap, Marker} from '@react-google-maps/api';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentPosition, resetLocation} from '../reducers/LocationReducer';
import PageContainer from './PageContainer';
import LoadingSpinner from './LoadingSpinner';
import WeatherInformation from './WeatherInformation';
import {styled, useTheme} from "@mui/material/styles";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import {Fab} from "@mui/material";
import SideNavBar from "./SideNavBar";
import SearchBar from "./SearchBar";

const drawerWidth = 240;

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
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
        libraries: ['places'],
    });

    const {currentPosition} = useSelector(
        (state) => state.location
    );

    console.log(isLoaded, currentPosition)

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
                            <SearchBar />
                            <SideNavBar/>
                            <WeatherInformation/>
                            <Marker position={currentPosition}/>
                        </GoogleMap>
                    )}
                </div>
            ) : (
                <LoadingSpinner/>
            )}
        </PageContainer>
    );
};

export default Map;
