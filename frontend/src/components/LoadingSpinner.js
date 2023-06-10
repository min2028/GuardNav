import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const LoadingSpinner = () => {
    return (
        <LoadingContainer>
            <CircularProgress style={{ color: 'black' }}  />
        </LoadingContainer>
    )
}

export default LoadingSpinner;