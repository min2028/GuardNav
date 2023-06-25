import React from "react";
import styled from "styled-components";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import { Link } from 'react-router-dom'


const ButtonContainer = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    color: black;
    height: 40px;
    width: 50%
`;

const Text = styled.div`
    margin-right: 8px;
`;

const PlanTripButton = () => {
    return (
        <Link to="/Map">
            <ButtonContainer>
                <Text>Plan Trip</Text>
                <ForkRightIcon />
            </ButtonContainer>
        </Link>
    );
};

export default PlanTripButton;
