import axiosClient from './axiosClient';

const API_URL = 'message';

const messageApi = {
    fetchListMessages: (conversationId, page, size) => {
        return axiosClient.get(`${API_URL}/${conversationId}`, {
            params: {
                page,
                size,
            },
        });
    },

    sendTextMessage: (conversationId, message) => {
        return axiosClient.post(`${API_URL}/${conversationId}/text`, message);
    },
};
export default messageApi;
