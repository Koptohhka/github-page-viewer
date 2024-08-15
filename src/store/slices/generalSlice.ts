import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { fetchReposData } from "./generalSlice.thunks";
import { FetchReposDataType, GeneralSliceStateType, RootStateType } from "../../types";

const initialState: GeneralSliceStateType = {
	loading: true,
	reposData: null,
	currentPage: 1,
	error: null,
	cache: {},
};

const generalSlice = createSlice({
	name: 'generalSlice',
	initialState,
	reducers: {
		setLoadingState(state, action: PayloadAction<boolean>) {
			state.loading = action.payload;
		},
		setReposData(state, action: PayloadAction<FetchReposDataType>) {
			state.reposData = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchReposData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchReposData.fulfilled, (state, action: PayloadAction<{ result: FetchReposDataType; cacheKey: string; }>) => {
				state.loading = false;
				state.reposData = action.payload.result;

				state.cache[action.payload.cacheKey] = action.payload.result;
			})
			.addCase(fetchReposData.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.reposData = null;

				state.error = action.payload;
			});
	},
});

export const generalSelectors = {
	selectError: (state: RootStateType) => state.general.error,
	selectReposData: (state: RootStateType) => state.general.reposData,
	selectLoadingState: (state: RootStateType) => state.general.loading,
	selectCurrentPage: (state: RootStateType) => state.general.currentPage,
};


export const generalActions = { ...generalSlice.actions, fetchReposData };
export const general = generalSlice.reducer;