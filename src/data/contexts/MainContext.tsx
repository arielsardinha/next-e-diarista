import React from 'react';
import { ExternalServicesProvider } from './ExternalServicesContext';

export const MainProvider: React.FC = ({ children }) => {
    return (
        <>
            <ExternalServicesProvider>{children}</ExternalServicesProvider>
        </>
    );
};
