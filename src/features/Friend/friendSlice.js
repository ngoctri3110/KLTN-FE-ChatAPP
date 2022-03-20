import friendApi from 'api/friendApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const KEY = 'friend';

export const fetchListRequestFriend = createAsyncThunk(
    `${KEY}/fetchListRequestFriend`,
    async (params, thunkApi) => {
        const data = await friendApi.fetchListRequestFriend();
        return data;
    }
);

export const fetchFriends = createAsyncThunk(
    `${KEY}/fetchFriends`,
    async (params, thunkApi) => {
        const { name } = params;
        const data = await friendApi.fetchFriends(name);
        return data;
    }
);

const friendSlice = createSlice({
    name: KEY,
    initialState: {
        isLoading: false,
        requestFriends: [],
        myRequestFriend: [],
        friends: [],
        amountNotify: 0,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setAmountNotify: (state, action) => {
            state.amountNotify = action.payload;
        },
    },
    extraReducers: {
        [fetchListRequestFriend.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchListRequestFriend.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.requestFriends = action.payload;
            state.amountNotify = action.payload.length;
        },
        [fetchListRequestFriend.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [fetchFriends.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchFriends.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.friends = action.payload;
        },
        [fetchFriends.rejected]: (state, action) => {
            state.isLoading = false;
        },
    },
});

const { reducer, actions } = friendSlice;
export const { setLoading, setAmountNotify } = actions;
export default reducer;
