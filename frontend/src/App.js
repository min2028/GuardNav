import logo from './logo.svg';
import './App.css';
import { MapPage } from './pages';
import styled from 'styled-components';

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
      <MapPage />
    </AppContainer>
  );
}

export default App;
