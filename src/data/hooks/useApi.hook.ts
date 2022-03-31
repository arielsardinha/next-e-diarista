import useSWR from 'swr';
import { AxiosRequestConfig } from 'axios';
import { ApiService } from 'data/services/ApiService';

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
