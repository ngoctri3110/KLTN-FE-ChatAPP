import meApi from 'api/meApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const KEY = 'global';
export const fetchUserProfile = createAsyncThunk(
    `${KEY}/fetchUser`,
    async (params, thunkApi) => {
        const user = await meApi.fetchProfile();
        return user;
    }
);

const globalSlice = createSlice({
    name: KEY,
    initialState: {
        isLoading: false,
        isLogin: false,
        user: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setAvatarProfile: (state, action) => {
            state.user.avatar = action.payload;
        },
        setCoverPhotoProfile: (state, action) => {
            state.user.coverPhoto = action.payload;
        },
    },

    extraReducers: {
        [fetchUserProfile.pending]: (state, action) => {
            state.isLoading = false;
        },
        [fetchUserProfile.fulfilled]: (state, action) => {
            state.isLoading = true;
            state.isLogin = true;
            state.user = action.payload;
        },
        [fetchUserProfile.rejected]: (state, action) => {
            state.isLoading = true;
            state.isLogin = false;
            localStorage.removeItem('token');
        },
    },
});

const { reducer, actions } = globalSlice;

export const { setLoading, setLogin, setAvatarProfile, setCoverPhotoProfile } =
    actions;

export default reducer;
