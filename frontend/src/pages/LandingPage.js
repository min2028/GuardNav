import React from "react";
import GoalComponent from "../components/landingPage/GoalComponent";
import Requirements from "../components/Requirements";
import MeetTeam from "../components/landingPage/MeetTeam";
import NavBar from "../components/basePage/NavBar";
import HomePage from "../components/landingPage/HomePage";
import { Element } from "react-scroll";


export default function LandingPage() {
    return (
        <>
            <NavBar />
            <HomePage />
            <GoalComponent />
            <Element name="requirements">
                <Requirements />
            </Element>
            <MeetTeam />
        </>
    );
}