import axiosClient from './axiosClient';

const API_URL = '/message/polls';

const pollApi = {
    createPoll: (conversationId, question, options) => {
        return axiosClient.post(`${API_URL}/${conversationId}`, {
            question,
            options,
        });
    },
};

export default pollApi;
