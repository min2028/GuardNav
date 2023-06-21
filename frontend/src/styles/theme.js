import {createTheme} from "@mui/material";

/*
To Use:
- Add another field/object if needed in the global theme. (eg, breakpoints, typography, sizes, etc)
- If making styled components outside a function, can access this by calling theme.palette.primary.main as an example
- If needed inside the function, must call "const theme = useTheme();" first before you can access.
 */
export const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            low: '#f0e3ec',
            mid: '#f08f7a',
            high: '#ea6249',
            hover: '#fcbd71'
        },
        secondary: {
            main: '#000000',
            light: '#405169',
            lighter: '#556b87',
            dark: '#1d2633',
            contrastText: '#f5f5f5',
        },
        background: {
            nav: '#000000',
            default: '#1a191a'
        },
        error: {
            main: '#FF5C5C'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
})