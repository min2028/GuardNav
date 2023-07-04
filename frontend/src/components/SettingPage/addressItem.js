import React from "react";
import styled from "styled-components";
import { Icon } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const AddressItemContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 12px;
    padding: 10px;
    background-color: #f0e3ec;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const AddressName = styled.div`
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 5px;
`;

const AddressDetails = styled.div`
    display: flex;
    flex-direction: column;
    color: black;
`;

const IconContainer = styled.div`
    margin-left: auto;
`;

const AddressItem = ({ address }) => {
    return (
        <AddressItemContainer>
            <AddressDetails>
                <AddressName>{address.name}</AddressName>
                <div>Address: {address.address}</div>
            </AddressDetails>
            <IconContainer>
                <Icon>
                    <EditIcon />
                </Icon>
            </IconContainer>
        </AddressItemContainer>
    );
};

export default AddressItem;
