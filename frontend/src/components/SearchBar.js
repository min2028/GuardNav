import React, { useRef } from "react";
import styled from 'styled-components'
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";

import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import SearchIcon from '@mui/icons-material/Search';
 
const SearchInput = styled.input`
    height: 100%;
    border: none;
    width: 100%;
    font-size: 16px;
    border-radius: 8px;
    background-color: transparent;
    border: 1px solid #000000;
    padding: 0.75rem;
`;

const SearchBar = ({ onSearch, ...props }) => {
    const { currentPosition } = useSelector((state) => state.location);
    const searchInputRef = useRef(null);

    const theme = useTheme();

    let locationBounds = {
        north: currentPosition?.lat + 0.1,
        south: currentPosition?.lat - 0.1,
        east: currentPosition?.lng + 0.1,
        west: currentPosition?.lng - 0.1,
    }

    const onPlacesChanged = () => {
        const places = searchInputRef.current.getPlaces();
        
        const formattedSearch = {
            lat: places[0]?.geometry?.location?.lat(),
            lng: places[0]?.geometry?.location?.lng(),
            formatted_address: places[0]?.formatted_address,
        }

        onSearch(formattedSearch);
    };

    return (
            <StandaloneSearchBox
                onLoad={ref => searchInputRef.current = ref}
                onPlacesChanged={onPlacesChanged}
                bounds={locationBounds}
            >
                <SearchInput ref={searchInputRef} placeholder={props?.placeholder} style={props?.style}></SearchInput>
            </StandaloneSearchBox>
    );
};

export default SearchBar;
