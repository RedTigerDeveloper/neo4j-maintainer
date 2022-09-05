import React from 'react';
import { Typography } from "@mui/material";

export function Title(props: any) {
    const { title } = props;
    return  (
        <Typography m={4} variant="h3" component="h2">
            {title}
        </Typography>
    )
}