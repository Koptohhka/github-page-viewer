import React from "react";
import { Box, Alert } from '@mui/material';
import { FetchReposDataType } from "@typings/";

type Props = {
    errorData: FetchReposDataType;
}

export const ErrorComponent: React.FC<Props> = ({ errorData }) => {
    return (
        <Box sx={{ marginTop: 4 }}>
            <Alert severity="error">
                Error status {errorData.status} <br/>
                {errorData.message}. Please try again later.
            </Alert>
        </Box>
    )
}