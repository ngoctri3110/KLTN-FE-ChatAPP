import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import channelApi from 'api/channelApi';
import classifyApi from 'api/classifyApi';
import conversationApi from 'api/conversationApi';
import friendApi from 'api/friendApi';
import messageApi from 'api/messageApi';
import pollApi from 'api/pollApi';
import stickerApi from 'api/stickerApi';

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
    async (params, thunkApi) => {
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

export const getMembersConversation = createAsyncThunk(
    `${KEY}/getMembersConversation`,
    async (params, thunkApi) => {
        const { conversationId } = params;
        const members = await conversationApi.getMemberInConversation(
            conversationId
        );
        return members;
    }
);

// =============== Channel ===============

export const fetchChannels = createAsyncThunk(
    `${KEY}/fetchChannels`,
    async (params, thunkApi) => {
        const { conversationId } = params;
        const data = await channelApi.fetchChannel(conversationId);
        return data;
    }
);
export const fetchMessageInChannel = createAsyncThunk(
    `${KEY}/fetchMessageInChannel`,
    async (params, thunkApi) => {
        const { channelId, page, size } = params;
        const data = await messageApi.getMessageInChannel(
            channelId,
            page,
            size
        );

        return {
            messages: data,
            channelId,
        };
    }
);

export const getLastViewChannel = createAsyncThunk(
    `${KEY}/getLastViewChannel`,
    async (params, thunkApi) => {
        const { channelId } = params;
        const lastViews = await channelApi.getLastViewChannel(channelId);

        return lastViews;
    }
);
//============== Sticker ===========
export const fetchAllSticker = createAsyncThunk(
    `${KEY}/fetchAllSticker`,
    async () => {
        const data = await stickerApi.fetchAllSticker();
        return data;
    }
);
//========= Poll ==========
export const fetchPolls = createAsyncThunk(
    `${KEY}/fetchPolls`,
    async (params, thunkApi) => {
        const { conversationId, page, size } = params;
        const data = await pollApi.getVotes(conversationId, page, size);
        return data;
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
        memberInConversation: [],
        currentChannel: '',
        channels: [],
        type: false,
        stickers: [],
        polls: [],
        totalPagesPoll: 0,
        totalChannelNotify: 0,
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
        setCurrentChannel: (state, action) => {
            state.currentChannel = action.payload;
        },
        setTypeOfConversation: (state, action) => {
            const conversationId = action.payload;
            const conversation = state.conversations.find(
                (ele) => ele.id === conversationId
            );
            if (conversation) {
                state.type = conversation.type;
            }
        },
        updatePoll: (state, action) => {
            state.polls = action.payload;
        },
        setTotalChannelNotify: (state, action) => {
            let notify = state.conversations.find(
                (ele) => ele.id === state.currentConversation
            ).numberUnread;

            if (state.channels.length > 0) {
                state.channels.forEach((ele) => {
                    if (ele.numberUnread && ele.numberUnread > 0) {
                        notify += 1;
                    }
                });
            }

            state.totalChannelNotify = notify;
        },
        leaveGroup: (state, action) => {
            const conversationId = action.payload;
            const newConvers = state.conversations.filter(
                (ele) => ele.id !== conversationId
            );
            state.conversations = newConvers;
            state.currentConversation = '';
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

            state.currentConversation = conversationId;

            state.messages = action.payload.messages.data;
            state.currentPage = action.payload.messages.page;
            state.totalPages = action.payload.messages.totalPages;
        },
        [getMembersConversation.fulfilled]: (state, action) => {
            const tempMembers = [...action.payload];
            const temp = [];

            tempMembers.forEach((member) => {
                state.friends.forEach((friend) => {
                    if (member.id === friend.id) {
                        member = { ...member, isFriend: true };
                        return;
                    }
                });
                temp.push(member);
            });

            state.memberInConversation = temp;
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
        // Friend
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
        // Channel
        [fetchChannels.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchChannels.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.channels = action.payload;
        },
        [fetchChannels.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [fetchMessageInChannel.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchMessageInChannel.fulfilled]: (state, action) => {
            state.isLoading = false;
            const { messages, channelId } = action.payload;

            const channelIndex = state.channels.findIndex(
                (channel) => channel.id === channelId
            );
            state.channels[channelIndex] = {
                ...state.channels[channelIndex],
                numberUnread: 0,
            };
            state.currentChannel = channelId;

            state.messages = messages.data;
            state.currentPage = messages.page;
            state.totalPages = messages.totalPages;
        },

        [fetchMessageInChannel.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [getLastViewChannel.fulfilled]: (state, action) => {
            state.lastViewOfMember = action.payload;
        },

        // Sticker
        [fetchAllSticker.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchAllSticker.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.stickers = action.payload;
        },
        [fetchAllSticker.rejected]: (state, action) => {
            state.isLoading = false;
        },
        // Poll
        [fetchPolls.fulfilled]: (state, action) => {
            state.polls = action.payload.data;
            state.totalPagesPoll = action.payload.totalPages;
        },
    },
});

const { reducer, actions } = chatSlice;
export const {
    setLoading,
    setConversations,
    setCurrentConversation,
    setCurrentChannel,
    setTypeOfConversation,
    updatePoll,
    setTotalChannelNotify,
    leaveGroup,
} = actions;

export default reducer;
