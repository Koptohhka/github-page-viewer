import {FetchReposDataType  } from "./apiData";

export type GeneralSliceStateType = {
	loading: boolean;
	reposData: null | FetchReposDataType;
	currentPage: number;
	error: null | FetchReposDataType;
	cache: any;
}

export type RootStateType = {
	general: GeneralSliceStateType;
};