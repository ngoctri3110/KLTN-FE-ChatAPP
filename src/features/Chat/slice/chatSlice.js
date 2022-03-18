import ClassifyApi from 'api/ClassifyApi';
import conversationApi from 'api/conversationApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const KEY = 'chat';

// Conversation
export const fetchListConversations = createAsyncThunk(
    `${KEY}/fetchListConversations`,
    async (params, thunkApi) => {
        const { name, type } = params;
        const conversations = await conversationApi.fetchListConversations(
            name,
            type
        );

        return conversations;
    }
);

// Classify
export const fetchListClassify = createAsyncThunk(
    `${KEY}/fetchListClassify`,
    async (params, thunkApi) => {
        const classifies = await ClassifyApi.getClassifies();
        return classifies;
    }
);

const chatSlice = createSlice({
    name: KEY,
    initialState: { isLoading: false, conversations: [], classifies: [] },
    reducers: {},
    extraReducers: {
        [fetchListConversations.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchListConversations.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.conversations = action.payload;
        },

        // classify
        [fetchListClassify.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchListClassify.fulfilled]: (state, action) => {
            state.classifies = action.payload;
            state.isLoading = false;
        },
        [fetchListClassify.rejected]: (state, action) => {
            state.classifies = action.payload;
            state.isLoading = false;
        },
    },
});

const { reducer, actions } = chatSlice;
export const {} = actions;

export default reducer;
