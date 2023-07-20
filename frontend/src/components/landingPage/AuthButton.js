import React, {useEffect} from 'react';
import {GoogleLogin, useGoogleOneTapLogin} from "@react-oauth/google";
import {decodeJwt} from "jose";
import {useDispatch, useSelector} from "react-redux";
import {getUserAsync} from "../../thunks/userThunk";
import { setHistory } from '../../reducers/HistoryReducer';

export default function AuthButton() {

    const dispatch = useDispatch();

    const handleCredentialResponse = (credentialResponse) => {
        const {credential} = credentialResponse;
        const payload = credential ? decodeJwt(credential) : undefined;
        console.log(payload)
        if (payload) {
            // console.log("Decoded JWT ID token payload: " + JSON.stringify(payload));
            let temp = dispatch(getUserAsync(credential)).then((res) => {
                console.log(res.payload);
                dispatch(setHistory(res.payload.history));
            });
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
