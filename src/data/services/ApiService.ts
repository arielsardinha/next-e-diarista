import axios from 'axios';
import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';

const url = process.env.NEXT_PUBLIC_API;

export const ApiService = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});

export function linksResolver(
    Links: ApiLinksInterface[] = [],
    name: string
): ApiLinksInterface | undefined {
    return Links.find((link) => link.rel === name);
}
