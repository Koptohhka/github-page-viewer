import React from "react";
import { Typography, ListItem, Link } from '@mui/material';

import { RepositoryItemType } from "@typings/";

type Props = {
    repoData: RepositoryItemType;
}

export const RepoItem: React.FC<Props> = ({ repoData }) => {
    const { id, html_url, full_name, description, stargazers_count } = repoData;

    return (
        <ListItem
            key={id}
            sx={{
                borderBottom: '1px solid #e0e0e0',
                paddingY: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}
        >
            <Link
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
                variant="h6"
                sx={{ marginBottom: 1 }}
            >
                {full_name}
            </Link>
            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
                {description}
            </Typography>
            <Typography variant="caption" color="textSecondary">
                ⭐ {stargazers_count}
            </Typography>
        </ListItem>
    );
}