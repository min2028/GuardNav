import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import style from 'styled-components';
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Report";
import Logo from "../Logo";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearHistoryAsync } from "../../thunks/historyThunk";
import useMediaQuery from '@mui/material/useMediaQuery';



const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: 10,
    whiteSpace: "nowrap",
    position: "relative",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

const ListItemIconCustom = style(ListItemIcon)`
    margin-left: ${(props) => props.isMobileScreen ? "unset" : '8px'} !important;
`;

const IconButtonCustom = style(IconButton)`
    padding: ${(props) => props.isMobileScreen ? "0px" : '8px'} !important;
`;



export default function SideNavBar({ setShowAllHistory, showAllHistory }) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawer = () => {
        setOpen(!open);
    };

    const navigationTextAndAction = [
        { text: "Home", action: () => window.location.replace("/") },
        {
            text: "Clear History",
            action: () =>
                window.confirm(
                    "Are you sure you wish to clear your history? There will be no going back!"
                ) && dispatch(clearHistoryAsync()),
        },
        { text: showAllHistory ? "Hide All History" : "Show All History" ,action: () => {
            setShowAllHistory(!showAllHistory);
        }},
        { text: "Report", action: () => {
            alert("We are sorry to hear that you are having issues with our app.");
        } },
    ];

    const isMobileScreen = useMediaQuery((theme) => {
        return theme.breakpoints.down('sm');
      });

    return (
        <Box sx={{ display: "flex", height: "100%" }}>
            <CssBaseline />
            <Drawer variant="permanent" anchor="left" open={open}>
                <DrawerHeader>
                    {open && <Logo />}
                    <IconButtonCustom isMobileScreen= {isMobileScreen} onClick={handleDrawer} sx={{ mr: 1 }}>
                        {open ? <ChevronLeftIcon /> : <MenuIcon />}
                    </IconButtonCustom>
                </DrawerHeader>
                <Divider />
                <List>
                    {navigationTextAndAction.map(({ text, action }) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={action}>
                                <ListItemIconCustom
                                    isMobileScreen = {isMobileScreen}
                                    sx={{
                                        color: theme.palette.primary.main,
                                        ml: 1,
                                    }}
                                >
                                    {text === "Home" && <HomeIcon />}
                                    {text.includes("All History") && <HistoryIcon />}
                                    {text === "Report" && <ReportIcon />}
                                    {text === "Clear History" && (
                                        <DeleteForeverIcon />
                                    )}
                                </ListItemIconCustom>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {["Settings"].map((text, index) => (
                        <Link
                            key={index}
                            to="/setting"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <ListItemButton>
                                <ListItemIconCustom
                                    isMobileScreen = {isMobileScreen}
                                    sx={{
                                        color: theme.palette.primary.main,
                                        ml: 1,
                                    }}
                                >
                                    {text === "Settings" && <SettingsIcon />}
                                </ListItemIconCustom>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
