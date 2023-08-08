import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../../resources/logo.png';
import SignInButton from '../landingPage/SignInButton';
import { Logout } from '../../reducers/UserReducer';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {useAuth0} from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import ProfileDropdown from '../mapPage/ProfileDropdown';

const pages = ['map', 'about'];
const settings = ['Dashboard', 'Logout'];

function NavBar() {
    const dispatch = useDispatch();
    
    const {
        logout,
        isAuthenticated
    } = useAuth0();
    
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting) => {
        if (setting === "Logout") {
            logout();
            dispatch(Logout());
        }
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/">
                    <Avatar alt="Logo" src={Logo} />
                    </Link>
                        <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        GuardNav
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex'} }}>
                        {pages.map((page) => (
                            <Link to={`/${page}`}>
                                <Button
                                    key={page}
                                    sx={{ my: 2, color: 'white', display: 'block', textAlign: 'center'}}
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    {isAuthenticated && (
                        <ProfileDropdown />
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;
