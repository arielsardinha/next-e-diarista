export interface ApiLinksInterface {
    type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    uri: string;
    rel: string;
}
