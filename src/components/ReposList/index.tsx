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
        if (repositoriesData) {
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

    if (!repositoriesData) {
        return null;
    }

    return (
        <div>

            <Typography variant="h4" component="h1" gutterBottom>
                Most Popular TypeScript Projects on GitHub
            </Typography>

            <List>
                {repositoriesData.items.map((repoData: any) => (<RepoItem repoData={repoData} />))}
            </List>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                />
            </Box>
        </div>
    );
}