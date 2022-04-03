import mediaApi from 'api/mediaApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const KEY = 'MEDIAFILE';

export const fetchAllMedia = createAsyncThunk(
    `${KEY}/fetchAllMedia`,
    async (params, thunkApi) => {
        const { conversationId } = params;
        const media = await mediaApi.getAllMedia(conversationId);
        return media;
    }
);
const mediaSlice = createSlice({
    name: KEY,
    initialState: {
        media: {},
    },
    reducers: {},
    extraReducers: {},
});

const { reducer, action } = mediaSlice;

export default reducer;
