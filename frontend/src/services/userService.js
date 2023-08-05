import axios from 'axios';

const getUser = async (token) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/protected/user`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        response.data.token = token;
        return response.data;
    } catch (err) {
        console.log(err.message)
        return err.message();
    }
}

const updateUserName = async (token, id, name) => {
    try {
        const response = await axios.patch(
            `${process.env.REACT_APP_API_URL}/protected/user/${id}/name`,
            { "name": name },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        response.data.token = token;
        return response.data;
    } catch (err) {
        console.log(err.message)
        return err.message();
    }
}

const updateUserNumber = async (token, id, number) => {
    try {
        const response = await axios.patch(
            `${process.env.REACT_APP_API_URL}/protected/user/${id}/number`,
            { "number": number },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        response.data.token = token;
        return response.data;
    } catch (err) {
        console.log(err.message)
        return err.message();
    }
}

export default {
    getUser,
    updateUserName,
    updateUserNumber
}