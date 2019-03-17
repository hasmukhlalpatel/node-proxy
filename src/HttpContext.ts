import * as http from 'http'
import {HostConfig, RouteConfig} from "./HostConfig"

export class HttpContext{

    constructor(private hostConfig :HostConfig,
        private request: http.IncomingMessage,
        private response: http.ServerResponse) {
        
    }

    get HostConfig(): HostConfig {
        return this.hostConfig;
    }

    get Request(): http.IncomingMessage {
        return this.request;
    }

    get Response(): http.ServerResponse {
        return this.response;
    }
}