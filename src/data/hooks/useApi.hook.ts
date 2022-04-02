import useSWR, { mutate } from 'swr';
import { AxiosRequestConfig } from 'axios';
import { ApiService, ApiServiceHateoas } from 'data/services/ApiService';
import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { useEffect, useCallback } from 'react';

export default function useApi<OutputType>(
    endPoint: string | null,
    config?: AxiosRequestConfig
): { data: OutputType | undefined; error: Error } {
    const { data, error } = useSWR(endPoint, async (url) => {
        const response = await ApiService(url, config);
        return response.data;
    });

    return { data, error };
}

export function useApiHateoas<OutputType>(
    links: ApiLinksInterface[] = [],
    nome: string | null,
    config?: AxiosRequestConfig
): { data: OutputType | undefined; error: Error } {
    const makeRequest = useCallback(() => {
        return new Promise<OutputType>((resolve) => {
            ApiServiceHateoas(links, nome || '', async (request) => {
                const response = await request<OutputType>(config);
                resolve(response.data);
            });
        });
    }, [links, nome, config]);

    const { data, error } = useSWR<OutputType>(nome, makeRequest);

    useEffect(() => {
        mutate(nome, makeRequest);
    }, [links, nome, makeRequest]);

    return { data, error };
}
