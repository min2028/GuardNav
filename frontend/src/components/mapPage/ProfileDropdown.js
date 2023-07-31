import React, { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../reducers/UserReducer";

import { Menu, MenuItem, Divider } from "@mui/material";

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

    > svg {
        color: ${({ theme }) => theme.palette.primary.main};
        transition: color 0.05s;
    }

    &:hover {
        > svg {
            color: ${({ theme }) => theme.palette.primary.hover};
            drop-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        }
    }
`;

const ProfileDropdown = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    let open = Boolean(anchorEl);
    let isLoggedIn = useSelector((state) => state.user.token !== "");
    console.log(useSelector((state) => state.user.token));

    return (
        <ProfileDropdownContainer theme={theme} >
            <AccountButton onClick={(e) => setAnchorEl(e.currentTarget)} theme={theme}>
                <AccountCircleIcon style={{ fontSize: '40px' }} />
            </AccountButton>
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
                {isLoggedIn ? (
                    <>
                        <MenuItem onClick={() => {
                            window.location.href = '/setting';
                        }}>
                            <PermIdentityIcon style={{marginRight: '0.5rem'}} /> Profile
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => {
                            dispatch(Logout());
                            window.location.href = '/';
                        }}>
                            <LogoutIcon style={{marginRight: '0.5rem'}} /> Logout
                        </MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem onClick={() => {
                            window.location.href = '/';
                        }}>
                            <PermIdentityIcon style={{marginRight: '0.5rem'}} /> Login
                        </MenuItem>
                    </>
                )}
            </Menu>
        </ProfileDropdownContainer>
    )
}

export default ProfileDropdown