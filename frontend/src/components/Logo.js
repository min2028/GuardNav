import logo from '../resources/logo.png';
import styled from 'styled-components';

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: auto;
    align-items: center;
`

const LogoImage = styled.img`
    max-width: 48px;
    max-height: auto;
`

const LogoText = styled.div`
    font-size: 24px;
    color: black;
    margin-left: 8px;
`


const Logo = () => {
    return (
        <LogoContainer>
            <LogoImage src = {logo} alt = "logo" />
            <LogoText>guardnav</LogoText>
        </LogoContainer>
    )
}

export default Logo;