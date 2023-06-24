import styled from 'styled-components';
import { useTheme } from '@mui/material';

import { Tabs, Tab as BaseTab } from '@mui/material';

const RouteOptionsContainer = styled(Tabs)`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const Tab = styled(BaseTab)`
    width: ${100 / 3}%;
`;

const RouteOptions = ({ option, setOption }) => {
    const theme = useTheme();

    return (
        <RouteOptionsContainer
                value={option}
                onChange={(event, newValue) => {
                    setOption(newValue);
                }}
                TabIndicatorProps={{
                    style: {
                        backgroundColor: option === "safest" ? theme.palette.risk.low : option === "balanced" ? theme.palette.risk.mid : theme.palette.risk.high,
                    }
                  }}
            >
            <Tab label={"Safest"} value={"safest"} />
            <Tab label={"Balanced"} value={"balanced"} />
            <Tab label={"Fastest"} value={"fastest"} />
        </RouteOptionsContainer>
    )
};

export default RouteOptions;