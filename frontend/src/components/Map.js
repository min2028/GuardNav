import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import PageContainer from './PageContainer';

const Map = ({  }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    });

    console.log(process.env.REACT_APP_GOOGLE_MAPS_KEY)

    return (
        <PageContainer>
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={{
                        width: '100%',
                        height: '100%',
                    }}
                    zoom={8}
                    center={{
                        lat: -34.397,
                        lng: 150.644,
                    }}
                />
            ) : (
                <CircularProgress />
            )}
        </PageContainer>
    );
};

export default Map;