import './App.css';
import {MapPage} from './pages';
import styled from 'styled-components';
import {Switch} from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
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
    //   <AppContainer className={"App"}>
    // <Router>
    //     <ThemeProvider theme={theme}>
    //         <NavBar/>
    //         <Switch>
    //             <Route exact path="/" component={LandingPage} />
    //             <Route path="/map" component={MapPage} />
    //         </Switch>
    //     </ThemeProvider>
    // </Router>
    //     </AppContainer>
      <AppContainer className={"App"}>
          <ThemeProvider theme={theme}>
              {/* <MapPage /> */}
              <LandingPage ></LandingPage>
          </ThemeProvider>
      </AppContainer>
  );
}

export default App;
