import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchReposDataType, RootStateType } from "../../types";

type FetchReposDataParams = {
    page: number;
    itemsPerPage: number;
};

export const fetchReposData = createAsyncThunk<
    { result: FetchReposDataType; cacheKey: string },
    FetchReposDataParams,
    { rejectValue: FetchReposDataType }
>(
    'general/fetchReposData',
    async (payload, { rejectWithValue, getState }) => {
        try {
            const { page, itemsPerPage } = payload;

            const state = getState() as RootStateType;

            const cacheKey = `${page}-${itemsPerPage}`;
            const cachedData = state.general.cache[cacheKey];
            if (cachedData) {
                return {
                    result: cachedData,
                    cacheKey
                };
            }

            const response = await fetch(
                `https://api.github.com/search/repositories?q=language:typescript&sort=stars&order=desc&page=${page}&per_page=${itemsPerPage}`
            );
            const result = await response.json();

            if (response.status === 200) {
                return { result, cacheKey };
            } else {
                return rejectWithValue({ message: result.message, status: response.status.toString() });
            }
        } catch (e) {
            console.log("fetchReposData error: ", e);

            return rejectWithValue({
                message: "Internal server error",
                status: "500"
            });
        }
    }
);