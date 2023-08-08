import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Icon } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import { deleteSavedLocationAsync } from "../../thunks/savedLocationThunk";

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

const getMuiElement = (enumValue) => {
    switch (enumValue) {
        case "HOME":
            return <HomeIcon />;
        case "WORK":
            return <WorkIcon />;
        case "SCHOOL":
            return <SchoolIcon />;
        default:
            // You can choose to return a default icon or element here, if needed
            return null;
    }
};

const AddressItem = ({ address }) => {
    const dispatch = useDispatch();
    const handleDeleteAddress = () => {
        var result = window.confirm("Are you sure to delete?");
        if (result) {
            dispatch(deleteSavedLocationAsync(address));
            window.location.href = "/map";
        }

    };

    return (
        <AddressItemContainer>
            <AddressDetails>
                <AddressName>{address.name}</AddressName>
                <div>Address: {address.formatted_address}</div>
            </AddressDetails>
            <IconContainer>
                <Icon>
                    <div>{getMuiElement(address.type)}</div>
                </Icon>
                <Icon>
                    <DeleteForeverIcon
                        onClick={handleDeleteAddress}
                        style={{ cursor: "pointer" }}
                    />
                </Icon>
            </IconContainer>
        </AddressItemContainer>
    );
};

export default AddressItem;
