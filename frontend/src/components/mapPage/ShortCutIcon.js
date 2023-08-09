import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";

const ShortCutIcon = ({ address, onClick }) => {
    const getIconByType = () => {
        switch (address.type) {
            case "HOME":
                return <HomeIcon />;
            case "SCHOOL":
                return <SchoolIcon />;
            case "WORK":
                return <WorkIcon />;
            default:
                return null;
        }
    };

    return (
        <Tooltip title={`${address.formatted_address}`}>
            <IconButton onClick={onClick}>{getIconByType()}</IconButton>
        </Tooltip>
    );
};

export default ShortCutIcon;
