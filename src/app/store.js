import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './globalSlice';
import accountSlice from 'features/Account/accountSlice';
import chatSlice from 'features/Chat/slice/chatSlice';
import friendSlice from 'features/Friend/friendSlice';

const rootReducer = {
    global: globalSlice,
    account: accountSlice,
    chat: chatSlice,
    friend: friendSlice,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
