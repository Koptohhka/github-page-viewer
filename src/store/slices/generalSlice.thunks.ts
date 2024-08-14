import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FetchReposDataType } from "../../types";

export const fetchReposData = createAsyncThunk(
    'general/fetchReposData',
    async (payload, { rejectWithValue, getState }) => {
        try {
            const { page, itemsPerPage }: any = payload;

            const state: any = getState();

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
                return rejectWithValue(result);
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