import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FetchReposDataType } from "../../types";

type FetchReposDataParams = {
    page: number;
    itemsPerPage: number;
};

type FetchReposDataError = {
    message: string;
    status: string;
};

export const fetchReposData: any = createAsyncThunk<
    { result: FetchReposDataType; cacheKey: string }, // Возвращаемый тип
    FetchReposDataParams, // Тип аргументов
    { rejectValue: FetchReposDataError } // Тип ошибки, возвращаемой в случае неудачи
>(
    'general/fetchReposData',
    async (payload, { rejectWithValue, getState }) => {
        try {
            const { page, itemsPerPage } = payload; // Используем типизированный payload

            const state = getState() as any; // Здесь вы можете дополнительно типизировать state, если есть типизация вашего состояния

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