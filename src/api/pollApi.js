import axiosClient from './axiosClient';

const API_URL = '/message/polls';

const pollApi = {
    createPoll: (conversationId, question, options) => {
        return axiosClient.post(`${API_URL}/${conversationId}`, {
            question,
            options,
        });
    },
    deleteSelect: (messageId, options) => {
        console.log('delete', options);
        return axiosClient.delete(`${API_URL}/${messageId}/choose`, options);
    },
    selectPoll: (messageId, options) => {
        console.log('select_API', options);

        return axiosClient.post(`${API_URL}/${messageId}/choose`, options);
    },
    addPoll: (messageId, options) => {
        console.log('add_API', options);

        return axiosClient.post(`${API_URL}/${messageId}/options`, options);
    },
    getVotes: (conversationId, page, size) => {
        return axiosClient.get(`${API_URL}/${conversationId}/`, {
            params: {
                page,
                size,
            },
        });
    },
};

export default pollApi;
