import axios from "axios";

const addSavedLocation = async (token, item) => {
    console.log(token)
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/protected/savedLocation`,
            item,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (err) {
        console.log(err.message);
        return err.message();
    }
};

const deleteSavedLocation = async (token, item) => {
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_API_URL}/protected/savedLocation/${item.id}`,
            item,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (err) {
        console.log(err.message);
        return err.message();
    }
};


export { addSavedLocation, deleteSavedLocation };
