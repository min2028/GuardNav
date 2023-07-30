import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import { Button, capitalize, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import { sendMessage } from '../../services/messageServices';

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

const RouteInformation = ({ directions, onAddRouteToHistory, risk }) => {
    const theme = useTheme();
    const [ successOpen, setSuccessOpen ] = useState(false);
    let token = useSelector((state) => state.user.token);

    const time = directions?.routes[0].legs[0].duration.text || "0 mins";
    const distance = directions?.routes[0].legs[0].distance.text || "0 km";

    const sendDirectionsToPhone = () => {
        const to = '+17788379610';
        const directionsHeader = "[GuardNav] Directions from " + directions?.routes[0].legs[0].start_address + " to " + directions?.routes[0].legs[0].end_address + "\n\n";
        const body = directionsHeader + directions?.routes[0].legs[0].steps.map((step, index) => {
            return `${index + 1}. ${step.instructions} (${step.distance.text})`;
        }).join('\n').replace(/<[^>]*>?/gm, '');
            
        // Twilio SMS API has a limit of 1600 characters per message
        if (body.length > 1500) {
            for (let i = 0; i < body.length / 1500; i++) {
                sendMessage(token, {to, body: `\n\n[${i + 1}/${Math.ceil(body.length / 1500)}]\n\n ` + body.substring(i * 1500, (i + 1) * 1500)});
            }
        } else {
            sendMessage(token, {to, body});
        }
    }

    return (
        <RouteInformationContainer>
            <TimeAndAddRoute>
                <TimeText>{time}</TimeText>
                <div>
                    <Tooltip
                        title='Save Route'
                        placement='top'
                    >
                        <AddRouteButton 
                            onClick={() => {
                                onAddRouteToHistory();
                            }}
                            type='text'
                        >
                            <AddIcon />
                        </AddRouteButton>
                    </Tooltip>
                    <Tooltip
                        title='Send Directions to Phone'
                        placement='top'
                    >
                        <AddRouteButton
                            onClick={() => {
                                sendDirectionsToPhone();
                                setSuccessOpen(true);
                            }}
                            type='text'
                        >
                            <SendToMobileIcon />
                        </AddRouteButton>
                    </Tooltip>
                </div>
            </TimeAndAddRoute>
            <DistanceAndRisk>
                <BodyText>{distance}</BodyText>
                <BodyText
                    style={{
                        color: theme.palette.risk[risk?.toLowerCase()]
                    }}
                >{capitalize(risk)} Risk</BodyText>
            </DistanceAndRisk>
        </RouteInformationContainer>
    )
}

export default RouteInformation;
