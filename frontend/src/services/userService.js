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
        if (error.response?.status === 401) {
            try {
                // Call the refreshToken function to get a new access token
                const newAccessToken = await refreshToken(token);
                // Retry the original request with the new access token
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/protected/user`, {
                    headers: {
                        Authorization: `Bearer ${newAccessToken}`,
                    },
                });
                response.data.token = newAccessToken;
                return response.data;
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                throw refreshError;
            }
        } else {
            throw error;
        }
    }
}

// api.interceptors.response.use(
//     (response) => {
//         // If the request was successful, return the response
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//
//         // Check if the error status is 401 Unauthorized
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//
//             try {
//                 // Call the refresh-token endpoint to get a new access token using the refresh token
//                 const refreshToken = 'YOUR_REFRESH_TOKEN'; // Replace with your actual refresh token
//                 const response = await api.post('/api/refresh-token', { refreshToken });
//
//                 // Update the Authorization header with the new access token
//                 api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
//
//                 // Retry the original request with the new access token
//                 return api(originalRequest);
//             } catch (refreshError) {
//                 // If there was an error refreshing the token, log the user out or handle the error
//                 console.error('Error refreshing token:', refreshError);
//                 // Logout the user or redirect to login page, etc.
//                 // Example:
//                 // logoutUser();
//                 // redirectToLogin();
//                 throw refreshError;
//             }
//         }
//
//         // For any other errors, just throw the original error
//         throw error;
//     }
// );
export default {
    getUser
}