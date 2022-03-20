import axiosClient from './axiosClient';

const API_URL = '/friend';
const friendApi = {
    fetchListRequestFriend: () => {
        return axiosClient.get(`${API_URL}/requests`);
    },

    deleteRequestFriend: (userId) => {
        return axiosClient.delete(`${API_URL}/requests`, { userId });
    },

    acceptRequestFriend: (userId) => {
        return axiosClient.post(`${API_URL}/requests`, { userId });
    },
    fetchFriends: (name) => {
        return axiosClient.get(`${API_URL}`, {
            params: {
                name,
            },
        });
    },
};

export default friendApi;
