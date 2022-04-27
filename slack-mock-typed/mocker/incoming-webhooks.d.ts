export declare const incomingWebhooks: IncomingWebhooks<[]>;
import * as nock from "nock";
export declare type IncomingWebhookUrl = string;
export declare type IncomingWebhookHttpHeaders = nock.HttpHeaders;
export interface IncomingWebhooks<T> {
    addResponse: (opts: IncomingWebhookOptions<T>) => void;
    reset: () => void;
    start: () => void;
    calls: Array<IncomingWebhookCall<T>>;
}
export interface IncomingWebhookOptions<T> {
    url?: IncomingWebhookUrl;
    statusCode?: number;
    body?: T;
    headers?: IncomingWebhookHttpHeaders;
}
export interface IncomingWebhookCall<T> {
    url: IncomingWebhookUrl;
    params: T;
    headers: IncomingWebhookHttpHeaders;
}
