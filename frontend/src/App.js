import './App.css';
import { MapPage } from './pages';
import styled from 'styled-components';
import {ThemeProvider } from '@mui/material';
import { theme } from "./styles/theme";
import LandingPage from "./pages/LandingPage";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Requirements from "./components/Requirements";

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
            <Router>
                <ThemeProvider theme={theme}>
                    <Routes>
                        <Route exact path="/" element={<LandingPage/>} />
                        <Route path="/map" element={<MapPage/> } />
                    </Routes>
                </ThemeProvider>
            </Router>
        </AppContainer>
    );
}

export default App;
