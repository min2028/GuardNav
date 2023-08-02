import React from "react";
import NavBar from "../components/basePage/NavBar";
import AddressList from "../components/SettingPage/addressList";
import EditFavoriteLocation from "../components/SettingPage/editFavoriteLocation";
import { PageContainer } from "../components";
import styled from "@emotion/styled";

const SettingPageContainer = styled(PageContainer)`
    display: flex;
    margin-top: 60px;
    background-color: #1a191a;
    flex-direction: column;
`;

const SettingPage = () => {
    return (
        <SettingPageContainer>
            <NavBar />
            <EditFavoriteLocation />
            <AddressList />
        </SettingPageContainer>
    );
};

export default SettingPage;
