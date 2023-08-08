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
            hover: 'white',
            family: 'rubik'
        },
        secondary: {
            main: '#FFFFFF',
            light: '#405169',
            lighter: '#556b87',
            dark: '#1d2633',
            contrastText: '#f5f5f5',
            family: 'rubik'
        },
        background: {
            nav: '#000000',
            default: '#1a191a'
        },
        error: {
            main: '#FF5C5C'
        },
        risk: {
            low: '#82E0AA',
            mid: '#F8C471',
            high: '#EC7063'
        }
    },
    buttonPadding: {
        values: {
            paddingSides: '10px',
            paddingTopBottom: '12px',
        },
    },
    margins: {
        values: {
            marginSides: '12px',
            marginTopBottom: '18px',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 800,
            lmd: 1000,
            lg: 1200,
            xl: 1536,
        },
    },
})