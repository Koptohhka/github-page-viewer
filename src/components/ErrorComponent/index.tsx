import React from "react";
import { Box, Typography, List, ListItem, Link, Pagination, CircularProgress, Alert } from '@mui/material';

type Props = {
    errorData: any;
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