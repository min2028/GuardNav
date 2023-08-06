import React from "react";
import NavBar from "../components/basePage/NavBar";
import AddressList from "../components/SettingPage/addressList";
import EditFavoriteLocation from "../components/SettingPage/editFavoriteLocation";
import { PageContainer } from "../components";
import styled from "@emotion/styled";
import ProfileSettings from "../components/SettingPage/ProfileSettings";

const SettingPageContainer = styled(PageContainer)`
    display: flex;
    margin-top: 60px;
    background-color: #1a191a;
    flex-direction: column;
`;

const SettingPage = ({ google, isLoaded }) => {
    return (
        <>
            {isLoaded && (
                <SettingPageContainer>
                    <NavBar />
                    <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                        <EditFavoriteLocation />
                        <ProfileSettings />
                    </div>
                    <AddressList />
                </SettingPageContainer>
            )}
        </>
    );
};

export default SettingPage;
