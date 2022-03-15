import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './globalSlice';
import accountSlice from 'features/Account/accountSlice';

const rootReducer = { global: globalSlice, account: accountSlice };

const store = configureStore({
    reducer: rootReducer,
});

export default store;
