import {combineReducers, configureStore, EnhancedStore} from '@reduxjs/toolkit';

import {general} from './slices/generalSlice';

const appReducer = combineReducers({
	general,
});


export const store = configureStore({
	reducer: appReducer,
});