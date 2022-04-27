export declare const web: Web<[]>;
import * as nock from "nock";
export declare type WebUrl = string;
export declare type WebHttpHeaders = nock.HttpHeaders;
export interface Web<T> {
    addResponse: (opts: WebOptions<T>) => void;
    reset: () => void;
    start: () => void;
    calls: Array<WebCall<T>>;
}
export interface WebOptions<T> {
    url?: WebUrl;
    statusCode?: number;
    body?: T;
    headers?: WebHttpHeaders;
}
export interface WebCall<T> {
    url: WebUrl;
    params: T;
    headers: WebHttpHeaders;
}
