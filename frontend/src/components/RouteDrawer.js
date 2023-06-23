import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

import { RoutePlanner, RouteOptions } from './index.js';

const Drawer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    z-index: 5;
    height: 100vh;
    width: 50%;
    background-color: white;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    white-space: nowrap;

    ${props => !props.open && css`
        transform: translateX(-100%);
        width: 0;
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

const RouteDrawer = ({ open, onClose, option, setOption }) => {
    return (
        <Drawer
            open={open}
        >
            <DrawerHeader>
                <h2>Trip Planner</h2>
                <CloseButton onClick={onClose}>
                    <CloseIcon fontSize='medium' />
                </CloseButton>
            </DrawerHeader>
            <Divider />
            <RoutePlanner />
            <RouteOptions option={option} setOption={setOption} />
            <Divider />
        </Drawer>
    )
};

export default RouteDrawer;