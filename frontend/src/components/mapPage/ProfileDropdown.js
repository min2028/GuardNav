import React, {useEffect, useState} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {useAuth0} from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../reducers/UserReducer";

import { Menu, MenuItem, Divider } from "@mui/material";
import {getUserAsync} from "../../thunks/userThunk";

const ProfileDropdownContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    margin: auto;
    height: 48px;
`;

const AccountButton = styled.button`
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: none;

    > .MuiAvatar-root {
        drop-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        width: 40px;
        height: 40px;
    }
`;

const ProfileDropdown = () => {
    const {
        user,
    } = useAuth0();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);

    const username = useSelector(state => state.user.name);
    const userPicture = user?.picture;

    let open = Boolean(anchorEl);

    const {
        loginWithPopup,
        getAccessTokenSilently,
        isAuthenticated,
        logout
    } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            getAccessTokenSilently().then(token => {
                dispatch(getUserAsync(token));
            }).catch(err => {
                console.log(err);
            });
        }
    }, [isAuthenticated]);

    return (
        <ProfileDropdownContainer theme={theme} >
            <AccountButton onClick={(e) => setAnchorEl(e.currentTarget)} theme={theme}>
                {isAuthenticated ? (
                    <Avatar alt={username} src={userPicture} />
                ) : (
                    <AccountCircleIcon fontSize="large" />
                )}
            </AccountButton>
                {isAuthenticated ? (
                        <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                        onClick={() => setAnchorEl(null)}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={() => {
                            navigate("/setting");
                        }}>
                            <PermIdentityIcon style={{marginRight: '0.5rem'}} /> {username}
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => {
                            logout({ returnTo: window.location.origin});
                            dispatch(Logout());
                        }}>
                            <LogoutIcon style={{marginRight: '0.5rem'}} /> Logout
                        </MenuItem>
                    </Menu>
                ) : (
                    <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                        onClick={() => setAnchorEl(null)}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={() => {
                            loginWithPopup();
                        }}>
                            <PermIdentityIcon style={{marginRight: '0.5rem'}} /> Login
                        </MenuItem>
                    </Menu>
                )}
        </ProfileDropdownContainer>
    )
}

export default ProfileDropdown