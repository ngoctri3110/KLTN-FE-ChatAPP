import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import classifyApi from 'api/classifyApi';
import conversationApi from 'api/conversationApi';
import friendApi from 'api/friendApi';
import messageApi from 'api/messageApi';

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

export const getLastViewOfMembers = createAsyncThunk(
    `${KEY}/getLastViewOfMembers`,
    async (params, _) => {
        const { conversationId } = params;
        const lastViews = await conversationApi.getLastViewOfMembers(
            conversationId
        );

        return lastViews;
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
// Message
export const fetchListMessages = createAsyncThunk(
    `${KEY}/fetchListMessages`,
    async (params, thunkApi) => {
        const { conversationId, page, size } = params;

        const messages = await messageApi.fetchListMessages(
            conversationId,
            page,
            size
        );

        return {
            messages,
            conversationId,
        };
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

// Create a group chat
export const createGroup = createAsyncThunk(
    `${KEY}/createGroup`,
    async (params, thunkApi) => {
        const { name, userIds } = params;
        const idNewGroup = await conversationApi.createGroup(name, userIds);
        return idNewGroup;
    }
);

const chatSlice = createSlice({
    name: KEY,
    initialState: {
        isLoading: false,
        conversations: [],
        currentConversation: '',
        classifies: [],
        friends: [],
        lastViewOfMember: [],
        messages: [],
        currentPage: '',
        totalPages: '',
        toTalUnread: 0,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = true;
        },
        setConversations: (state, action) => {
            const conversation = action.payload;
            state.conversations = [conversation, ...state.conversations];
        },
        setCurrentConversation: (state, action) => {
            state.currentConversation = action.payload;
        },
    },
    extraReducers: {
        // conversation
        [fetchListConversations.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchListConversations.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.conversations = action.payload;
        },
        [getLastViewOfMembers.fulfilled]: (state, action) => {
            state.lastViewOfMember = action.payload;
        },
        [fetchListMessages.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchListMessages.fulfilled]: (state, action) => {
            state.isLoading = false;

            // xét currentConversation
            const conversationId = action.payload.conversationId;
            const conversationIndex = state.conversations.findIndex(
                (conversationEle) => conversationEle.id === conversationId
            );

            state.conversations[conversationIndex] = {
                ...state.conversations[conversationIndex],
                numberUnread: 0,
            };

            // state.currentConversation = conversationId;

            state.messages = action.payload.messages.data;
            state.currentPage = action.payload.messages.page;
            state.totalPages = action.payload.messages.totalPages;
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
export const { setLoading, setConversations, setCurrentConversation } = actions;

export default reducer;
