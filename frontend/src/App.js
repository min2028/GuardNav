import './App.css';
import {MapPage} from './pages';
import styled from 'styled-components';
import {ThemeProvider} from '@mui/material';
import {theme} from "./styles/theme";
import LandingPage from "./pages/LandingPage";
import {Route, Router} from "react-router-dom";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
      <AppContainer className={"App"}>
          <ThemeProvider theme={theme}>
              {/* <MapPage /> */}
              <LandingPage ></LandingPage>
          </ThemeProvider>
      </AppContainer>
  );
}

export default App;
