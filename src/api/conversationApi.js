import axiosClient from './axiosClient';

const API_URL = '/conversations';

const conversationApi = {
    fetchListConversations: (name, type) => {
        return axiosClient.get(API_URL, {
            params: {
                name,
                type,
            },
        });
    },
    createConversationIndividual: (userId) => {
        console.log('createConversationIndividual', userId);
        return axiosClient.post(`${API_URL}/dual/${userId}`);
    },
    getConversationById: (id) => {
        return axiosClient.get(`${API_URL}/${id}`);
    },
    getLastViewOfMembers: (conversationId) => {
        return axiosClient.get(`${API_URL}/${conversationId}/view-last`);
    },
    leaveGroup: (conversationId) => {
        return axiosClient.delete(`${API_URL}/${conversationId}/members`);
    },
};

export default conversationApi;
