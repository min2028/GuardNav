import React from 'react';
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { decodeJwt } from "jose";
import { useDispatch } from "react-redux";
import { getUserAsync } from "../thunks/userThunk";
import { setHistory } from '../reducers/HistoryReducer';

function getGoogleOAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
        redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URI,
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "openid",
        ].join(" "),
    };

    console.log({options})

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
}

export default function AuthButton() {
    const scopes = ["openid", "email", "profile"];
    const dispatch = useDispatch();

    const handleCredentialResponse = (credentialResponse) => {
        const { credential } = credentialResponse;
        const payload = credential ? decodeJwt(credential) : undefined;
        if (payload) {
            console.log(credential);
            dispatch(getUserAsync(credential))
                .then((res) => {
                    const user = res.payload;
                    console.log(user.history);
                    dispatch(setHistory(user.history));
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                });
        }
    };

    const oneTapLogin = useGoogleOneTapLogin({
        onSuccess: handleCredentialResponse,
        onError: (err) => {
            console.log(err);
        },
        scope: scopes.join(' '),
        accessType: 'offline',
        prompt: 'consent',
        responseType: 'code',
    });

    return (
        <div>
            <a href={getGoogleOAuthURL()}>Login with Google</a>
        </div>
    );
}
