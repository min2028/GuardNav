import React from "react";
import GoalComponent from "../components/GoalComponent";
import Requirements from "../components/Requirements";
import MeetTeam from "../components/MeetTeam";
import NavBar from "../components/NavBar";
import { Element } from "react-scroll";

export default function LandingPage() {
    return (
        <>
            <NavBar/>
            <GoalComponent />
            <Element name="requirements">
                <Requirements />
            </Element>
            <MeetTeam />
        </>
    );
}