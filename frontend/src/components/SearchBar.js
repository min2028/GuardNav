import React, { useRef } from "react";
import styled from 'styled-components'
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";

import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import SearchIcon from '@mui/icons-material/Search';

const SearchWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${({ theme }) => `${theme.buttonPadding.values?.paddingSides} ${theme.buttonPadding?.values?.paddingTopBottom}`};
    background-color: #ffffff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    opacity: 0.9;
    width: 100%;

    > div {
        width: 100%;
        text-align: start;
    }
    
`;
 
const SearchInput = styled.input`
    height: 100%;
    border: none;
    width: 100%;
    font-size: 16px;
    outline: none;
    border-radius: 12px;
    background-color: transparent;
`;

const SearchButton = styled.button`
    background-color: transparent;
    border: none;
    padding: 0 0 0 8px;
    cursor: pointer;

    > svg {
        color: ${({ theme }) => theme.palette.primary.main};
        transition: color 0.05s;
    }

    &:hover {
        > svg {
            color: ${({ theme }) => theme.palette.primary.hover};
        }
    }
`;

const SearchBar = () => {
    const { currentPosition } = useSelector((state) => state.location);
    const searchInputRef = useRef(null);

    const theme = useTheme();

    let locationBounds = {
        north: currentPosition.lat + 0.1,
        south: currentPosition.lat - 0.1,
        east: currentPosition.lng + 0.1,
        west: currentPosition.lng - 0.1,
    }

    const onPlacesChanged = () => {
        const places = searchInputRef.current.getPlaces();
        // TODO
    };

    return (
        <SearchWrapper theme = {theme}>
            <StandaloneSearchBox
                onLoad={ref => searchInputRef.current = ref}
                onPlacesChanged={onPlacesChanged}
                bounds={locationBounds}
            >
                <SearchInput ref={searchInputRef} placeholder="Where are you going?"></SearchInput>
            </StandaloneSearchBox>
            <SearchButton theme = {theme}>
                <SearchIcon />
            </SearchButton>
        </SearchWrapper>
    );
};

export default SearchBar;
