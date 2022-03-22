import axiosClient from './axiosClient';
const API_URL = 'users';

const userApi = {
    fetchUser: (username) => {
        return axiosClient.get(`${API_URL}/find/username/${username}`);
    },
};

export default userApi;
