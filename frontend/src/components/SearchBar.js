import React from "react";
import styled from 'styled-components'
import { useTheme } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import { theme } from "../styles/theme";

const SearchWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    margin: 8px 24px;
    padding: 0 24px;
    height: 48px;
    width: 35%;
    background-color: #ffffff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    opacity: 0.8;

`;

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
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
    return (
        <SearchWrapper>
            <SearchInput placeholder="Search" />
            <SearchButton theme = {theme}>
                <SearchIcon />
            </SearchButton>
        </SearchWrapper>
    );
};

export default SearchBar;