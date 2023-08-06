import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { updateUserNameAsync, updateUserNumberAsync } from '../../thunks/userThunk';
import MuiPhoneNumber from '@mui/icons-material/AccountCircleOutlined';

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 400px;
    margin: 10px auto;
    border-radius: 10px;
    padding: 20px;
    background-color: #f0e3ec;
`;

const FormWrapper = styled.div`
    background-color: #f0e3ec;
    border-radius: 20px;
    padding: 20px;
`;

const FormTitle = styled.h2`
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;

    .form-row {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        label {
            margin-right: 10px;
        }

        input {
            flex: 1;
            padding: 5px;
        }
    }

    .submit-button {
        margin-top: 10px;
        align-self: center;
        padding: 10px 20px;
        border-radius: 10px;
        background-color: #4caf50;
        color: white;
        cursor: pointer;
        border: none;
    }
`;

const ProfileSettings = () => {
    const dispatch = useDispatch();

    const originalName = useSelector(state => state.user.name);
    const originalPhoneNumber = useSelector(state => state.user.number);

    const user = useSelector(state => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const number = e.target.number.value;

        console.log(user)

        if (name !== originalName) {
            console.log('updating name')
            dispatch(updateUserNameAsync({ token: user.token, id: user.id, name }));
        }

        if (number !== originalPhoneNumber) {
            dispatch(updateUserNumberAsync({ token: user.token, id: user.id, number }));
        }
    }

    return (
        <FormContainer>
            <FormWrapper>
                <FormTitle>Profile Settings</FormTitle>
                <Form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" defaultValue={originalName} />
                    </div>
                    <div className="form-row">  
                        <label htmlFor="number">Phone Number</label>
                        <MuiPhoneNumber defaultCountry={'ca'} id="number" />
                    </div>
                    <button className="submit-button" type="submit">Save Changes</button>
                </Form>
            </FormWrapper>
        </FormContainer>
    )
}

export default ProfileSettings