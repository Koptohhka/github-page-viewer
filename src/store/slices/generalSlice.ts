import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchReposData } from "./generalSlice.thunks";
import { FetchReposDataType } from "../../types";

type GeneralSlicestateType = {
	loading: boolean;
	reposData: null | FetchReposDataType;
	currentPage: number;
	error: null | FetchReposDataType;
	cache: any;
}

const initialState: GeneralSlicestateType = {
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
			.addCase(fetchReposData.fulfilled, (state, action: PayloadAction<any>) => {
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
	selectError: (state: any) => state.general.error,
	selectReposData: (state: any) => state.general.reposData,
	selectLoadingState: (state: any) => state.general.loading,
	selectCurrentPage: (state: any) => state.general.currentPage,
};


export const generalActions: any = { ...generalSlice.actions, fetchReposData };
export const general = generalSlice.reducer;