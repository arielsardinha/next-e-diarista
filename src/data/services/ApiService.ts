import axios, { AxiosRequestConfig } from 'axios';
import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { LocalStorage } from './StorageService';

const url = process.env.NEXT_PUBLIC_API;

export const ApiService = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});

ApiService.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response.status === 401 &&
            error.response.data.code === 'token_not_valid'
        ) {
            handleTokenRefresh(error);
        }
        return Promise.reject(error);
    }
);

async function handleTokenRefresh(error: { config: AxiosRequestConfig }) {
    const tokenRefresh = LocalStorage.get<string>('token_refresh', '');

    if (tokenRefresh) {
        LocalStorage.clear('token');
        LocalStorage.clear('token_refresh');
        try {
            const { data } = await ApiService.post('/auth/token/refresh/', {
                refresh: tokenRefresh,
            });
            LocalStorage.set('token', data.acess);
            LocalStorage.set('token_refresh', data.refresh);

            ApiService.defaults.headers.Authorization = `Bearer ${data.acess}`;

            error.config.headers.Authorization =
                ApiService.defaults.headers.Authorization;

            return ApiService(error.config);
        } catch (err) {
            return error;
        }
    } else {
        return error;
    }
}

export function linksResolver(
    Links: ApiLinksInterface[] = [],
    name: string
): ApiLinksInterface | undefined {
    return Links.find((link) => link.rel === name);
}
