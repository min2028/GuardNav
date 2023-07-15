import React from "react";
import styled from "styled-components";

const RouteDirectionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    padding: 1.5rem;
    gap: 8px;
    height: 100%;
    overflow-y: scroll;
`;

const RouteDirectionCard = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`;

const RouteDirections = ({directions = {}}) => {
    const steps = directions?.routes[0].legs[0].steps;

    return (
        <RouteDirectionsContainer>
            {steps?.map((step) => {
                return (
                    <RouteDirectionCard key={step.encoded_lats_lngs}>
                        <p dangerouslySetInnerHTML={{ __html: step.instructions }} />
                        <p>{step.distance.text}</p>
                    </RouteDirectionCard>
                );
            })}
        </RouteDirectionsContainer>
    )
}

export default RouteDirections