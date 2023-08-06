import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AddressItem from "./addressItem";

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
    const addresses = useSelector((state) => state.saved_location.items);
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
                    <AddressItemWrapper key={address.id}>
                        <AddressItem address={address} />
                    </AddressItemWrapper>
                ))}
            </AddressListContainer>
        </div>
    );
};

export default AddressList;
