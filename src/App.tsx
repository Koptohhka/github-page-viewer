import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';

import { ReposList, Loader, ErrorComponent } from "@components/";
import { generalSelectors, generalActions, fetchReposData } from "@store/";

export const App: React.FC = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(generalSelectors.selectLoadingState);
  const page = useSelector(generalSelectors.selectCurrentPage);
  const error = useSelector(generalSelectors.selectError);

  const initDataFetch = () => {
    dispatch(fetchReposData({
      page: page,
      itemsPerPage: 10
    }));
  }

  useEffect(() => {
    initDataFetch();
  }, []);

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <ErrorComponent errorData={error} />
  }

  return (
      <ReposList />
  );
};
