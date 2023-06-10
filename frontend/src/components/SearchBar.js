import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Divider from "@mui/material/Divider";

export default function SearchBar() {
    return (
        <Box sx={{'& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex',
                alignItems: 'flex-end'
            }}>
                <TextField id="search" label="search" variant="filled"/>

                <Divider />
            </Box>
        </Box>
    );
}