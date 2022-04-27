import nock = require("nock");
export declare function set(type: string, opts: WebOptions<{}>): void;
export declare function get(type: string, url: string): {}[];
export declare function reset(type: string): void;
export declare function resetAll(): void;
declare type WebUrl = string;
declare type WebHttpHeaders = nock.HttpHeaders;
export interface Web<T> {
    addResponse: (opts: WebOptions<T>) => void;
    reset: () => void;
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
export {};
