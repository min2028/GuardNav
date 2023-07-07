import React, { useState } from "react";
import styled from "styled-components";
import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';
import ButtonContainer from "./ButtonContainer";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useTheme } from "@mui/material/styles";
import AuthButton from "./AuthButton";

const Text = styled.div`
    margin-right: 8px;
`;

const SignInButtonContainer = styled.div`
    margin-top: 1rem;
`;


const ContentDesciption = styled.h2`
    font-size: 1.5rem;
    margin: 0px;
    font-weight: 500;
    color: ${(props) => props.theme.palette.primary.main};
    margin-bottom: 1rem;
`;


const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: ${props => props.theme.palette.secondary.main};
    boxShadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 2rem;
`;

const SignInButton = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const theme = useTheme();

    return (
        <SignInButtonContainer>
            <ButtonContainer onClick={handleOpen}>
                <Text>Log in</Text>
                <LoginIcon />
            </ButtonContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyledBox theme = {theme}>
                    <ContentDesciption theme = {theme}>
                        Log in Using Google
                    </ContentDesciption>
                    
                    <AuthButton />
                </StyledBox>
            </Modal>
        </SignInButtonContainer>
    );
};

export default SignInButton;
