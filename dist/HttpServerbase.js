"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("./HttpClient");
const IncomingMessageProcessor_1 = require("./IncomingMessageProcessor");
const HeaderPrcoessor_1 = require("./HeaderPrcoessor");
class HttpServerbase {
    constructor(hostConfig) {
        this.hostConfig = hostConfig;
    }
    callback(srvRequest, srvResponse) {
        let options = this.BuildOptions(srvRequest);
        srvResponse.on('error', (err) => {
            console.error(err);
        });
        const httpClient = new HttpClient_1.HttpClient(options, srvResponse);
        new HeaderPrcoessor_1.RequestHeaders(srvRequest, httpClient.request).SetHeaders();
        let reqProcessor = new IncomingMessageProcessor_1.IncomingMessageProcessor(srvRequest, (data) => {
            httpClient.Send(data);
        }, () => {
            httpClient.SendEnd();
        }, (err) => {
            srvResponse.statusCode = 500;
        });
    }
    BuildOptions(srvRequest) {
        return {
            host: "192.168.1.51",
            path: srvRequest.url,
            method: srvRequest.method,
            port: 8080
        };
    }
}
exports.HttpServerbase = HttpServerbase;
//# sourceMappingURL=HttpServerbase.js.map