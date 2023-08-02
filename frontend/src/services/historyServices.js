import axios from 'axios';


const addHistoryItem = async (token, item) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/protected/history`,
            item,
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

const changeFavourite = async (token, id, favourite) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/protected/history/${id}/favourite`,
            { favourite },
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

const clearHistory = async (token) => {
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_API_URL}/protected/history`,
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

export {
    addHistoryItem,
    changeFavourite,
    clearHistory
};
