import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, CircularProgress, Pagination, List, ListItem, Link } from '@mui/material';

import { RepoItem } from "@components/";
import { generalSelectors, generalActions } from "@store/";

export const ReposList: React.FC = () => {
    const dispatch = useDispatch();

    const repositoriesData = useSelector(generalSelectors.selectReposData);
    const page = useSelector(generalSelectors.selectCurrentPage);

    const itemsPerPage = useMemo(() => 10, []);
    const totalPages = useMemo(() => {
        if (repositoriesData && repositoriesData.total_count) {
            return Math.ceil(repositoriesData.total_count / itemsPerPage)
        }

        return 0;
    }, []);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(generalActions.setCurrentPage(value));
        dispatch(generalActions.fetchReposData({
            page: value,
            itemsPerPage: itemsPerPage
        }));
    };

    if (!repositoriesData || !repositoriesData.items) {
        return null;
    }

    return (
        <Box sx={{
            padding: {
                xs: 0,
                sm: 3,
                md: 4,
                lg: 4,
            },
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            maxHeight: "100vh",
            boxSizing: "border-box",
            overflow: "hidden"
        }} >
            <Typography variant="h4" component="h1" gutterBottom>
                Most Popular TypeScript Projects on GitHub
            </Typography>
            <List sx={{
                overflow: "auto",
                flexGrow: "10",
                minHeight: "100%"
            }}>
                {repositoriesData.items.map((repoData) => (
                    <RepoItem key={repoData.id} repoData={repoData} />
                ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                />
            </Box>
        </Box>
    );
}