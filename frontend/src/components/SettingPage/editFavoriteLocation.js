import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { addSavedLocationAsync } from "../../thunks/savedLocationThunk";
import SearchBar from "../mapPage/SearchBar";

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
    const [type, setOptionValue] = useState("HOME");
    const [searchData, setSearchData] = useState({
        lat: null,
        lng: null,
        formatted_address: "",
    });

    const handleSearch = (searchResult) => {
        setSearchData(searchResult);
    };

    const handleSelect = (e) => {
        setOptionValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formatted_address = searchData.formatted_address;
        const lat = searchData.lat;
        const lng = searchData.lng;

        const favoritePlace = {
            formatted_address,
            lat,
            lng,
            to: {
                lat: lat,
                lng: lng,
                formatted_address: formatted_address,
            },
            type,
            _id: uuidv4().replace(/-/g, "").slice(0, 24),
        };
        dispatch(addSavedLocationAsync(favoritePlace));
    };

    return (
        <FormContainer>
            <FormWrapper>
                <Form id="addPlaceFocdrm" onSubmit={handleSubmit}>
                    <FormTitle>Add Favorite Place</FormTitle>
                    <div className="form-row">
                        <label htmlFor="dropdown">Select location:</label>
                        <select
                            id="dropdown"
                            onChange={handleSelect}
                        >
                            <option value="HOME">Home</option>
                            <option value="WORK">Work</option>
                            <option value="SCHOOL">School</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <SearchBar onSearch={handleSearch} value={searchData} />
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
