import React, {useEffect} from "react";
import styled from "styled-components";
import LoginIcon from '@mui/icons-material/Login';
import ButtonContainer from "./ButtonContainer";
import {useAuth0} from "@auth0/auth0-react";
import {getUserAsync} from "../../thunks/userThunk";
import {useDispatch, useSelector} from "react-redux";
import {decodeJwt} from "jose";

const Text = styled.div`
    margin-right: 8px;
`;

const SignInButtonContainer = styled.div`
    margin-top: 1rem;
`;

const SignInButton = () => {

    const dispatch = useDispatch();
    const userState = useSelector(state => state.user);

    const {
        user,
        loginWithRedirect,
        isAuthenticated,
        getAccessTokenSilently
    } = useAuth0();

    const getToken = async () => {
        const token = await getAccessTokenSilently();
        dispatch(getUserAsync(token));
    }

    useEffect(() => {
        if (isAuthenticated) {
            getToken();
        }
    }, [isAuthenticated]);

    console.log(userState);

    return (
        <SignInButtonContainer>
            {!isAuthenticated &&
                <ButtonContainer onClick={loginWithRedirect}>
                    <Text>Account</Text>
                    <LoginIcon />
                </ButtonContainer>
            }
        </SignInButtonContainer>
    );
};

export default SignInButton;
