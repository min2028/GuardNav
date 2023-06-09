import React, { useEffect } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPosition, resetLocation } from '../reducers/LocationReducer';
import PageContainer from './PageContainer';
import LoadingSpinner from './LoadingSpinner';
import WeatherInformation from './WeatherInformation';

const Map = () => {
  const dispatch = useDispatch();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });

  const { currentPosition } = useSelector(
    (state) => state.location
  );

  console.log(isLoaded, currentPosition)

  useEffect(() => {
    const getCurrentPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(setCurrentPosition({ lat: latitude, lng: longitude }));
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
              <WeatherInformation />
              <Marker position={currentPosition} />
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
