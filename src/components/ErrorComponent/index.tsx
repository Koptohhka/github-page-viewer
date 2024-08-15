import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { generalActions, AppDispatchType, fetchReposData } from "@store/";
import { Box, Alert, Button } from '@mui/material';
import { FetchReposDataType } from "@typings/";

type Props = {
    errorData: FetchReposDataType;
}

export const ErrorComponent: React.FC<Props> = ({ errorData }) => {
    const dispatch = useDispatch<AppDispatchType>();

    const buttonClickHandler = () => {
        dispatch(generalActions.setError(null));
        dispatch(generalActions.setCurrentPage(1));
        dispatch(fetchReposData({
            itemsPerPage: 10,
            page: 1
        }));
    }

    return (
        <Box sx={{ 
            margin: 2,
         }}>
            <Alert severity="error">
                Error status {errorData.status} <br />
                {errorData.message}. Please try again later.
            </Alert>
            <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={buttonClickHandler} 
                    sx={{ marginTop: 2 }}
                >
                    Go to First Page
                </Button>
        </Box>
    )
}