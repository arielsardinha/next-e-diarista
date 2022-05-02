import React from 'react';
import {
    JobDataContainer,
    JobInformationContainer,
    JobInformationIcon,
} from './JobInformation.style';
// import { } from '@material-ui/core';
// import { Component } from './JobInformation.style';

export interface JobInformationProps {}

const JobInformation: React.FC<JobInformationProps> = ({ children }) => {
    return (
        <JobInformationContainer>
            <JobInformationIcon />
            <JobDataContainer>{children}</JobDataContainer>
        </JobInformationContainer>
    );
};

export default JobInformation;
