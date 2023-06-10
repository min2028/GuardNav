import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
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

const drawerWidth = 240;

const ButtonsFA = styled('div', {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    paddingTop: '5px',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function SideNavBar() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    // const [extend, setExtend] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // const handleExt = () => {
    //     setExtend(!extend);
    // }
    //
    // const handleExtClose = () => {
    //     setExtend(!extend);
    // }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <ButtonsFA position="fixed" open={open}>
                <Toolbar sx={{gap: '10px'}}>
                    <Fab color="secondary"
                         size={"medium"}
                         aria-label="Menu"
                         sx={{
                             ...(open && {display: 'none'}),
                             opacity: 0.7,
                         }}
                    >
                        <IconButton
                            color="inherit"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                margin: 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Fab>
                </Toolbar>
            </ButtonsFA>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {['Home', 'Recents', 'Report'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{color: theme.palette.secondary.main}}>
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
                                <ListItemIcon sx={{color: theme.palette.secondary.main}}>
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


