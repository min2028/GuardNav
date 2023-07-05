import React from "react";
import GoalComponent from "../components/landingPage/GoalComponent";
import Requirements from "../components/Requirements";
import MeetTeam from "../components/landingPage/MeetTeam";
import NavBar from "../components/basePage/NavBar";
import { Element } from "react-scroll";


export default function LandingPage() {
    return (
        <>
            <NavBar />
            <GoalComponent />
            <Element name="requirements">
                <Requirements />
            </Element>
            <MeetTeam />
        </>
    );
}