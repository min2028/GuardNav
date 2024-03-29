import React from "react";
import ShortCutIcon from "./ShortCutIcon";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { setSavedLocation } from "../../reducers/SavedLocationReducer";
import { v4 as uuidv4 } from "uuid";

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
    const saved_locations = setSavedLocation(
        useSelector((state) => state.user)
    );
    const addresses = saved_locations.payload.saved_location;
    const theme = useTheme();

    return (
        <>
            {
                addresses.length > 0 && (
                    <InformationContainer theme={theme}>
                        {addresses.map((address) => (
                            <div key={uuidv4()}>
                                <ShortCutIcon
                                    address={address}
                                    onClick={() => onClick(address.to)} // Call the onClick prop here
                                />
                            </div>
                        ))}
                    </InformationContainer>
                )
            }
        </>
    );
};

export default ShortCut;

