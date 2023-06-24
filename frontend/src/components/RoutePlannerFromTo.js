import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import RoomIcon from '@mui/icons-material/Room';
import SearchBar from './SearchBar';
import { setTo, setFrom } from '../reducers/TripReducer';
import { addHistoryItem } from '../reducers/HistoryReducer';

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

const RoutePlannerFromTo = ({ directions }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    return (
        <RoutePlannerContainer>
            <RouteSettings>
                <Nav>
                    <Timeline position={'left'} sx={{color: theme.palette.primary.main, width: '20%'}}>
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <SearchBar 
                                    style={{marginTop: '-0.75rem'}} 
                                    placeholder={"From"} 
                                    value={directions?.routes[0]?.legs[0]?.start_address} 
                                    onSearch={(from) => {
                                        dispatch(setFrom(from));
                                    }}
                                />
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot sx={{background: theme.palette.primary.main}} />
                                <TimelineConnector sx={{background: theme.palette.primary.main}} />
                            </TimelineSeparator>
                            <TimelineContent>From</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <SearchBar 
                                    style={{marginTop: '-0.75rem'}} 
                                    placeholder={"To"} 
                                    value={directions?.routes[0]?.legs[0]?.end_address}
                                    onSearch={(to) => {
                                        dispatch(setTo(to));
                                    }}
                                />
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