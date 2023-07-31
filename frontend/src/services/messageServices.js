import axios from 'axios';

const sendMessage = async (token, item) => {
    console.log(item);

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/protected/message`,
            item,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        return response.data;
    } catch (err) {
        console.log("message failed to send")
    }
}

export {
    sendMessage
}