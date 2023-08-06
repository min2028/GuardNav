import './App.css';
import {useState} from "react";
import {MapPage} from './pages';
import styled from 'styled-components';
import {ThemeProvider} from '@mui/material';
import {theme} from "./styles/theme";
import LandingPage from "./pages/LandingPage";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import SettingPage from './pages/settingPage';
import Home from "./pages/Home";
import {useJsApiLoader} from "@react-google-maps/api";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

function App() {
    const [libraries] = useState(["places", "routes", "visualization"]);
    const { isLoaded, google } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
      libraries,
    });

    return (
        <AppContainer className={"App"}>
            <Router>
                <ThemeProvider theme={theme}>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route path="/about" element={<LandingPage/>}/>
                        <Route path="/map" element={<MapPage isLoaded={isLoaded} google={google} />}/>
                        <Route path="/setting" element={<SettingPage isLoaded={isLoaded} google={google}/>}/>
                    </Routes>
                </ThemeProvider>
            </Router>
        </AppContainer>
    );
}

export default App;
