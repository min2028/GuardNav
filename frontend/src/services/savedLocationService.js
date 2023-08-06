import axios from "axios";

const addSavedLocation = async (user, item) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/protected/savedLocation`,
            item,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        return response.data;
    } catch (err) {
        return err.message();
    }
};

const deleteSavedLocation = async (user, item) => {
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_API_URL}/protected/savedLocation/${item._id}`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        return response;
    } catch (err) {
        console.error(err.message);
        return err.message();
    }
};


export { addSavedLocation, deleteSavedLocation };
