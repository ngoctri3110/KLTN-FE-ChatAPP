import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './globalSlice';
import accountSlice from 'features/Account/accountSlice';
import chatSlice from 'features/Chat/slice/chatSlice';

const rootReducer = {
    global: globalSlice,
    account: accountSlice,
    chat: chatSlice,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
