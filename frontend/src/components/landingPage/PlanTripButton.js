import React from "react";
import styled from "styled-components";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import { Link } from 'react-router-dom'
import ButtonContainer from "./ButtonContainer";

const Text = styled.div`
    margin-right: 8px;
`;

const PlanTripButton = () => {
    return (
        <Link to="/map">
            <ButtonContainer>
                <Text>Plan Trip</Text>
                <ForkRightIcon />
            </ButtonContainer>
        </Link>
    );
};

export default PlanTripButton;
