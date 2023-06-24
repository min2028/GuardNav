import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import {useState} from "react"
import {Fab} from "@mui/material";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ReportIcon from '@mui/icons-material/Report';
import Logo from './Logo';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        zIndex: 10,
        whiteSpace: 'nowrap',
        position: 'relative',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const ToolbarCustom = styled('Toolbar')(({theme}) => ({
    alignItems: 'unset',
}));

export default function SideNavBar() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    // const [extend, setExtend] = useState(false);

    const handleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{display: 'flex', height: '100%'}}>
            <CssBaseline/>
            <Drawer
                variant="permanent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    {open && (
                        <Logo />
                    )}
                    <IconButton onClick={handleDrawer} sx={{mr: 1}}>
                        {open ? <ChevronLeftIcon/> : <MenuIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {['Home', 'Recents', 'Report'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{color: theme.palette.secondary.main, ml: 1}}>
                                    {text === 'Home' && <HomeIcon />}
                                    {text === 'Recents' && <HistoryIcon />}
                                    {text === 'Report' && <ReportIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['Help'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{color: theme.palette.secondary.main, ml: 1}}>
                                    {text === 'Help' && <HelpCenterIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}


