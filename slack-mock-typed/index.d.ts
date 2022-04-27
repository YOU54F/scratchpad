import { Events } from "./mocker/events";
import { IncomingWebhooks } from "./mocker/incoming-webhooks";
import { Web } from "./mocker/web";
export declare function SlackMocker(config?: ConfigOptions): Instance;
export interface Instance {
    incomingWebhooks: IncomingWebhooks<any>;
    events: Events<any>;
    web: Web<any>;
    reset: () => void;
}
export interface ConfigOptions {
    logLevel?: string;
}
