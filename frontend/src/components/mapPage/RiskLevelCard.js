import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import styled from "styled-components";

const RiskCard = styled(Card)`
    margin: 10px;
    border-radius: 20px;
    width: 200px;
    background-color: ${(props) =>
        props.risk === "Low"
            ? "green"
            : props.risk === "Medium"
            ? "yellow"
            : "red"};
`;

const RiskLevelCard = ({ risk, weight, onRiskLevelSelect }) => {
    return (
        <RiskCard
            onClick={() => {
                onRiskLevelSelect(weight);
            }}
            risk={risk}
        >
            <CardContent>
                <Typography color="text.secondary" gutterBottom>
                    {risk} Risk
                </Typography>
                <Typography variant="h5" component="div">
                    {risk}
                </Typography>
            </CardContent>
        </RiskCard>
    );
};

export default RiskLevelCard;
