import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RoutePlanner, RouteOptions, RouteInformation, RouteDirections } from '../index.js';
import { addHistoryItemAsync } from '../../thunks/historyThunk.js';
import { ContactlessOutlined } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';

const FlowHolder = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: all 0.3s ease-in-out;
    
    width: ${({ open }) => open ? '30%' : '0%'};
`;

const Drawer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    z-index: 5;
    height: 100vh;
    width: 30%;
    background-color: white;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    position: absolute;

    ${props => !props.open && css`
        transform: translateX(-100%);
        visibility: hidden;
    `}
`;

const DrawerHeader = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    min-height: 64px;
    align-items: center;
    padding: 0px 1rem;

    & > h2 {
        margin: 0px;
    }
`;

const CloseButton = styled.button`
    width: 40px;
    height: 40px;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    overflow: visible;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    margin: 0px;
    padding: 8px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
    }
`;

const Divider = styled.hr`
    margin: 0;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    border-width: 0;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.12);
    border-bottom-width: thin;
`;



const CustomDrawer = styled(Drawer)`
    width: ${(props) => props.isMidScreen ? (props.isMobileScreen ?  "unset " : '50%') : '30% '} !important;
`;

const RouteDrawer = ({ open, onClose, option, setOption, directions, openSuccessMessage, setSuccessMessage, handleOptionChange }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const isMobileScreen = useMediaQuery((theme) => {
        return theme.breakpoints.down('sm');
    });
    
    const isMidScreen = useMediaQuery((theme) => {
        return theme.breakpoints.down('md');
    });

    const optionToRiskMap = {
        "safest": "low",
        "balanced": "mid",
        "fastest": "high",
    }

    const onAddRouteToHistory = () => {
        let route = {
            risk: optionToRiskMap[option],
            from: {
                lat: directions.routes[0].legs[0].start_location.lat(),
                lng: directions.routes[0].legs[0].start_location.lng(),
                formatted_address: directions.routes[0].legs[0].start_address,
            },
            to: {
                lat: directions.routes[0].legs[0].end_location.lat(),
                lng: directions.routes[0].legs[0].end_location.lng(),
                formatted_address: directions.routes[0].legs[0].end_address,
            },
            // convert uuidv4 to mongodb ObjectId, again very hacky
            _id: uuidv4().replace(/-/g, '').slice(0, 24),
            favourite: false,
        }

        console.log(route._id)

        dispatch(addHistoryItemAsync(route));
        setSuccessMessage('Route Added Successfully! Note that only the 50 most recent routes are saved.');
        openSuccessMessage();
    }

    const onSendRouteToPhone = () => {
        setSuccessMessage('Directions are sent to your phone! Please check your messages.');
        openSuccessMessage();
    }

    return (
        <>
            <FlowHolder open={open} />
            <CustomDrawer
                isMobileScreen = {isMobileScreen}
                isMidScreen = {isMidScreen}
                open={open}
            >
                <DrawerHeader>
                    <h2>Trip Planner</h2>
                    <CloseButton onClick={onClose}>
                        <CloseIcon fontSize='medium' />
                    </CloseButton>
                </DrawerHeader>
                <Divider />
                <RoutePlanner directions={directions} />
                <RouteOptions option={option} setOption={setOption} handleOptionChange={handleOptionChange} />
                <Divider />
                <RouteInformation directions={directions} onAddRouteToHistory={onAddRouteToHistory} risk={optionToRiskMap[option]} onSendRouteToPhone={onSendRouteToPhone} />
                <Divider />
                <RouteDirections directions={directions} />
            </CustomDrawer>
        </>
    )
};

export default RouteDrawer;