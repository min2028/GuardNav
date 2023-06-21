import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import RoomIcon from '@mui/icons-material/Room';

const RoutePlannerContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
`;

const RouteSettings = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`;

const Nav = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
margin-top: 1rem;

& > ul {
    margin-bottom: 0px;

    & > li > div:nth-child(2) {
        min-width: 24px;

        & > span {
            align-self: center;
        }
    }
    & > li > div:last-child {
        max-width: 64px;
    }
}
`;

const FromToInput = styled.input`
width: 100%;
padding: 0.75rem;
margin-top: -0.5rem;
border-radius: 8px;
border: 1px solid rgba(0, 0, 0, 0.12);
`;

const RoutePlannerFromTo = () => {
    const theme = useTheme();

    return (
        <RoutePlannerContainer>
            <RouteSettings>
                <Nav>
                    <Timeline position={'left'} sx={{color: theme.palette.primary.main, width: '20%'}}>
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <FromToInput></FromToInput>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot sx={{background: theme.palette.primary.main}} />
                                <TimelineConnector sx={{background: theme.palette.primary.main}} />
                            </TimelineSeparator>
                            <TimelineContent>From</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <FromToInput></FromToInput>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                            <RoomIcon sx={{marginTop: '6px'}} />
                            </TimelineSeparator>
                            <TimelineContent>To</TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </Nav>
            </RouteSettings>
        </RoutePlannerContainer>
    )
}

export default RoutePlannerFromTo;