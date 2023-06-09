import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import PageContainer from './PageContainer';

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });
  const [currentPosition, setCurrentPosition] = useState(null);
  let userCircle = null;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  const createCircle = () => {
    if (currentPosition && window.google) {
      const { google } = window;
      const map = new google.maps.Map(document.getElementById('map'), {
        center: currentPosition,
        zoom: 16,
        disableDefaultUI: true,
      });

      userCircle = new google.maps.Circle({
        strokeColor: '#4285F4',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#4285F4',
        fillOpacity: 1,
        map,
        center: currentPosition,
        radius: 16,
      });
    }
  };

  useEffect(() => {
    createCircle();
  }, [currentPosition]);

  return (
    <PageContainer>
      {isLoaded && currentPosition ? (
        <div
          id="map"
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {currentPosition && (
            <Marker position={currentPosition} icon={null} />
          )}
        </div>
      ) : (
        <CircularProgress />
      )}
    </PageContainer>
  );
};

export default Map;
