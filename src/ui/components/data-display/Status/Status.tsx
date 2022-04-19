import React from 'react';
// import { } from '@material-ui/core';
import { StatusStyled } from './Status.style';

export interface StatusProps {
    color?: 'success' | 'error' | 'warning' | 'primary' | 'secondary';
}

const Status: React.FC<StatusProps> = ({ color = 'success', ...props }) => {
    return <StatusStyled sx={{ bgcolor: `${color}.main` }} {...props} />;
};

export default Status;
