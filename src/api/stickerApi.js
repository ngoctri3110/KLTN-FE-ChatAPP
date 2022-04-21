import axiosClient from './axiosClient';

const API_URL = '/sticker';

const stickerApi = {
    fetchAllSticker: () => {
        return axiosClient.get(`${API_URL}`);
    },
    deleteSticker: (id) => {
        console.log(id);
        return axiosClient.delete(`${API_URL}/${id}`);
    },
};

export default stickerApi;
