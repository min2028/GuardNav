import styled from 'styled-components';
import { useTheme } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import { SearchBar } from "./index";

const SearchWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2px 12px;
    background-color: #ffffff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    opacity: 0.9;
    width: 100%;
    margin-bottom: 0.5rem;

    > div {
        width: 100%;
        text-align: start;
    }
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

const PageSearchBar = ({ search, onSearch }) => {
    const theme = useTheme();

    return (
        <SearchWrapper theme = {theme}>
            <SearchBar placeholder = "Where are you going today?" style={{border: 'none', outline: 'none'}} onSearch={onSearch} />
            <SearchButton theme = {theme}>
                <SearchIcon />
            </SearchButton>
        </SearchWrapper>
    )
}

export default PageSearchBar;