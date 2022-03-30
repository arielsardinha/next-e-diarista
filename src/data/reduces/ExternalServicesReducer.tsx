import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { ApiService } from 'data/services/ApiService';
import produce from 'immer';
import React, { useReducer, useEffect } from 'react';

export const initialState = {
    externalServices: [] as ApiLinksInterface[],
};

export type InitialStateType = typeof initialState;
export type ExternalServicesActionType = {
    type: string;
    payload?: unknown;
};

export interface ExternalServiceReducerInterface {
    externalServicesState: InitialStateType;
    externalServicesDispatch: React.Dispatch<ExternalServicesActionType>;
}

const reducer = (
    state: InitialStateType,
    action: ExternalServicesActionType
): InitialStateType => {
    const nextState = produce(state, (draftState) => {
        draftState.externalServices = [];
        switch (action.type) {
            case 'UPDATE':
                draftState.externalServices =
                    action.payload as ApiLinksInterface[];
                break;
        }
    });
    return nextState;
};

export function useExternalServicesReducer(): ExternalServiceReducerInterface {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        ApiService.get<{ links: ApiLinksInterface[] }>('/api', {
            headers: { Authorization: null },
        }).then(({ data }) => {
            dispatch({ type: 'UPDATE', payload: data.links });
        });
    }, []);

    return {
        externalServicesState: state,
        externalServicesDispatch: dispatch,
    };
}
