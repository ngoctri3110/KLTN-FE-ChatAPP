import classifyApi from 'api/classifyApi';
import conversationApi from 'api/conversationApi';
import friendApi from 'api/friendApi';

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
        const classifies = await classifyApi.getClassifies();
        return classifies;
    }
);

// FRIEND API

export const fetchListFriends = createAsyncThunk(
    `${KEY}/fetchListFriends`,
    async (params, thunkApi) => {
        const { name } = params;
        const friends = await friendApi.fetchFriends(name);
        return friends;
    }
);
const chatSlice = createSlice({
    name: KEY,
    initialState: {
        isLoading: false,
        conversations: [],
        classifies: [],
        friends: [],
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = true;
        },
    },
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
        // FRIEND
        [fetchListFriends.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchListFriends.fulfilled]: (state, action) => {
            state.friends = action.payload;
            state.isLoading = false;
        },
        [fetchListFriends.rejected]: (state, action) => {
            state.isLoading = false;
        },
    },
});

const { reducer, actions } = chatSlice;
export const { setLoading } = actions;

export default reducer;
