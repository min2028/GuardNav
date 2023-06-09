import './App.css';
import {MapPage} from './pages';
import styled from 'styled-components';
import {ThemeProvider} from '@mui/material';
import {theme} from "./styles/theme";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <AppContainer className="App">
        <ThemeProvider theme={theme}>
            <MapPage />
        </ThemeProvider>
    </AppContainer>
  );
}

export default App;
