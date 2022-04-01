import axiosClient from './axiosClient';

const API_URL = '/sticker';

const stickerApi = {
    fetchAllSticker: () => {
        return axiosClient.get(`${API_URL}`);
    },
};

export default stickerApi;
