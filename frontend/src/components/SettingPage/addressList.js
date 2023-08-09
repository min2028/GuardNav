import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AddressItem from "./addressItem";
import { setSavedLocation } from "../../reducers/SavedLocationReducer";
import { v4 as uuidv4 } from "uuid";

const AddressListContainer = styled.div`
    height: 300px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    background-color: #1d2633;
    border-radius: 10px;
`;

const AddressItemWrapper = styled.div`
    width: 100%;
`;

const CenteredHeading = styled.h2`
    text-align: center;
    color: #f5f5f5;
`;

const AddressList = () => {
    const saved_locations = setSavedLocation(useSelector((state) => state.user));
    const addresses = saved_locations.payload.saved_location;
    const addressListRef = useRef(null);

    useEffect(() => {
        // Scroll to the top of the container when addresses are updated
        if (addressListRef.current) {
            addressListRef.current.scrollTop = 0;
        }
    }, [addresses]);

    return (
        <div>
            <CenteredHeading>Saved Address</CenteredHeading>
            <AddressListContainer ref={addressListRef}>
                {addresses.map((address) => (
                    <AddressItemWrapper key={uuidv4()}>
                        <AddressItem address={address} />
                    </AddressItemWrapper>
                ))}
            </AddressListContainer>
        </div>
    );
};

export default AddressList;
