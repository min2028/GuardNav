import React from "react";
import MainSection from "../components/MainSection";
import GoalComponent from "../components/GoalComponent";
import Requirements from "../components/Requirements";
import MeetTeam from "../components/MeetTeam";

export default function LandingPage() {
    return (
        <>
            <head>
                <title>GuardNav</title>
                <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
            </head>
            <MainSection />
            <GoalComponent />
            <Requirements />
            <MeetTeam />
        </>
    );
}