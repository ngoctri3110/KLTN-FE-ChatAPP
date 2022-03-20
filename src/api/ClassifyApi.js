import axiosClient from './axiosClient';

const API_URL = '/classify';

const classifyApi = {
    getClassifies: () => {
        return axiosClient.get(`${API_URL}`);
    },
    addClassifyForConversation: (id, conversationId) => {
        return axiosClient.post(`${API_URL}/conversations`, {
            id,
            conversationId,
        });
    },
};

export default classifyApi;
