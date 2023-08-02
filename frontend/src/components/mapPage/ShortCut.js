import React from "react";
import ShortCutIcon from "./ShortCutIcon";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";

const InformationContainer = styled.div`
    display: flex;
    flex-direction: row;
    max-height: 48px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    opacity: 0.9;
    padding: ${({ theme }) =>
        `${theme.buttonPadding.values.paddingSides} ${theme.buttonPadding.values.paddingTopBottom}`};
    cursor: default;
    align-items: center;
    right: 1rem;
    margin: 12px 12px;
`;

const ShortCut = ({ onClick }) => {
    // Use curly braces for destructuring
    const addresses = useSelector((state) => state.saved_location.items);
    const theme = useTheme();

    return (
        <InformationContainer theme={theme}>
            {addresses.map((address) => (
                <div key={address.id}>
                    <ShortCutIcon
                        address={address}
                        onClick={() => onClick(address.to)} // Call the onClick prop here
                    />
                </div>
            ))}
        </InformationContainer>
    );
};

export default ShortCut;

