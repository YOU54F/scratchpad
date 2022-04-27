export declare const events: Events<[]>;
import * as nock from "nock";
export declare type EventsUrl = string;
export interface Events<T> {
    send: (opts: EventsOptions<T>) => Promise<void>;
    reset: () => void;
    start: () => void;
    calls: Array<EventsCall<T>>;
}
export interface EventsOptions<T> {
    target?: string;
    data?: T;
}
export declare type EventsHttpHeaders = nock.HttpHeaders;
export interface EventsCall<T> {
    url: EventsUrl;
    params: T;
    body?: T;
    headers: EventsHttpHeaders;
    statusCode?: number;
}
