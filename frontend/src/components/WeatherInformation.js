import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Thunderstorm, WbSunny, WbCloudy, BeachAccess } from '@mui/icons-material';

const WeatherIcon = ({ weather }) => {
    switch (weather) {
        case 'Thunderstorm':
            return <Thunderstorm />;
        case 'Clear':
            return <WbSunny />;
        case 'Clouds':
            return <WbCloudy />;
        case 'Rain':
            return <BeachAccess />;
        default:
            return <WbSunny />;
    }
};

const InformationContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 108px;
    max-height: 48px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    opacity: 0.9;
    margin: 8px;
    padding: 8px 12px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: default;
`;

const WeatherInformation = () => {
    const [weatherData, setWeatherData] = useState(null);
    const currentPosition = useSelector(
        (state) => state.location.currentPosition
    );

    useEffect(() => {
        const getWeatherData = async () => {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${currentPosition.lat}&lon=${currentPosition.lng}&appid=${process.env.REACT_APP_OPEN_WEATHER}&units=metric`
            );
            const data = await response.json();
            setWeatherData(data);
        };

        if (currentPosition) {
            getWeatherData();
        }
    }, [currentPosition]);

    return (
        <InformationContainer>
            <WeatherIcon weather={weatherData?.weather?.[0]?.main || "Clear"} />
            <div style={{ margin: "auto" }}>
                {weatherData?.main?.temp
                ? `${Math.trunc(weatherData.main.temp)}°C`
                : "- -"}
            </div>
        </InformationContainer>
    );
};

export default WeatherInformation;
