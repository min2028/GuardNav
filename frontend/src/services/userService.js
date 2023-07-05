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
        return response.data;
    } catch (err) {
        console.log(err.message)
        return err.message();
    }
}


export default {
    getUser
}