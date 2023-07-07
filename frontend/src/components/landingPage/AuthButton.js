import React, {useEffect} from 'react';
import {GoogleLogin, useGoogleOneTapLogin} from "@react-oauth/google";
import {decodeJwt} from "jose";
import {useDispatch, useSelector} from "react-redux";
import {getUserAsync} from "../../thunks/userThunk";

export default function AuthButton() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)

    const handleCredentialResponse = (credentialResponse) => {
        const {credential} = credentialResponse;
        const payload = credential ? decodeJwt(credential) : undefined;
        if (payload) {
            // console.log("Decoded JWT ID token payload: " + JSON.stringify(payload));
            dispatch(getUserAsync(credential));
        };
    };
    // useEffect(() => {
    //     console.log('User in useEffect:', user);
    // }, [user]);

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
