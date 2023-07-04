import React, { useEffect } from 'react';
import {GoogleLogin, useGoogleOneTapLogin} from "@react-oauth/google";
import {decodeJwt} from "jose";

export default function AuthButton () {

    const handleCredentialResponse = (credentialResponse) => {
        const {credential} = credentialResponse;
        const payload = credential ? decodeJwt(credential) : undefined;
        if (payload) {
            console.log("Decoded JWT ID token payload: " + JSON.stringify(payload));
        }
    };

    // const oneTapLogin = useGoogleOneTapLogin(
    //     {
    //         onSuccess: handleCredentialResponse,
    //         onError: (error) => {
    //             console.log("Error: " + error);
    //         },
    //         nativePrompt: true,
    //         useGoogleAccountsCookie: true,
    //     });

    return (
        <GoogleLogin
            onSuccess={handleCredentialResponse}
            onError={(err) => {
                console.log(err);
            }}
            useOneTap={true}
        />
    );
}
