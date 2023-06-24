import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';

import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const RouteInformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    padding: 1.5rem;
    gap: 8px;
`;

const TimeAndAddRoute = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`;

const DistanceAndRisk = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`;

const TimeText = styled.h2`
    padding: 0;
    margin: 0;
`;

const BodyText = styled.h3`
    padding: 0;
    margin: 0;
`;

const AddRouteButton = styled(Button)`
    && {
        border-radius: 50%;
        padding: 0;
        margin: 0;
        min-width: 40px;
        min-height: 40px;
        margin-top: -8px;
        position: relative;
    }
`;

const RouteInformation = ({ directions, onAddRouteToHistory }) => {
    const theme = useTheme();
    const [ successOpen, setSuccessOpen ] = useState(false);

    const time = directions?.routes[0].legs[0].duration.text || "0 mins";
    const distance = directions?.routes[0].legs[0].distance.text || "0 km";
    const risk = "Low" // TODO: calculate risk

    return (
        <RouteInformationContainer>
            <TimeAndAddRoute>
                <TimeText>{time}</TimeText>
                <AddRouteButton 
                    title='Add Route to History'
                    onClick={() => {
                        onAddRouteToHistory();
                    }}
                    type='text'
                >
                    <AddIcon />
                </AddRouteButton>
            </TimeAndAddRoute>
            <DistanceAndRisk>
                <BodyText>{distance}</BodyText>
                <BodyText
                    style={{
                        color: theme.palette.risk[risk.toLowerCase()]
                    }}
                >{risk} Risk</BodyText>
            </DistanceAndRisk>
        </RouteInformationContainer>
    )
}

export default RouteInformation;
