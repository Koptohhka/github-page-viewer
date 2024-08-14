import {combineReducers, configureStore, EnhancedStore} from '@reduxjs/toolkit';

import {general} from './slices/generalSlice';

const appReducer = combineReducers({
	general,
});


export const store: EnhancedStore<any> = configureStore({
	reducer: appReducer,
});