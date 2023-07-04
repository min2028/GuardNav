import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { addPlace } from "../../reducers/SavedPlaceReducer";

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

const EditFavoriteLocation = () => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const favoritePlace = {
            address,
            name,
            id: uuidv4(),
        };
        dispatch(addPlace(favoritePlace));
    };

    return (
        <FormContainer>
            <FormWrapper>
                <Form id="addPlaceForm" onSubmit={handleSubmit}>
                    <FormTitle>Add Favorite Place</FormTitle>
                    <div className="form-row">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            required
                            placeholder="Home/Work/Gym"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            required
                            placeholder="8492 Oak Street"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <button className="submit-button" type="submit">
                        Add
                    </button>
                </Form>
            </FormWrapper>
        </FormContainer>
    );
};

export default EditFavoriteLocation;
