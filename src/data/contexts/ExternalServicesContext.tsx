// import React, { createContext } from 'react';
// import {
//     ExternalServiceReducerInterface,
//     initialState,
//     useExternalServicesReducer,
// } from 'data/reduces/ExternalServicesReducer';

// const initialValue: ExternalServiceReducerInterface = {
//     externalServicesState: initialState,
//     externalServicesDispatch: () => {},
// };

// export const ExternalServicesContext = createContext({ initialValue });

// export const ExternalServicesProvider: React.FC = ({ children }) => {
//     const reducer = useExternalServicesReducer();

//     return (
//         <ExternalServicesContext.Provider value={reducer}>
//             {children}
//         </ExternalServicesContext.Provider>
//     );
// };

import React, { createContext } from 'react';
import {
ExternalServiceReducerInterface,
initialState,
useExternalServicesReducer,
} from 'data/reduces/ExternalServicesReducer';

const initialValue: ExternalServiceReducerInterface = {
    externalServicesState: initialState,
    externalServicesDispatch: () => {},
};

export const ExternalServicesContext = createContext(initialValue);

export const ExternalServicesProvider: React.FC = ({ children }) => {
    const reducer = useExternalServicesReducer();

    return (
        <ExternalServicesContext.Provider value={reducer}>
            {children}
        </ExternalServicesContext.Provider>
    );
};
