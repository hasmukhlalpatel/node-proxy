"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("./HttpClient");
class HttpServerbase {
    constructor(hostConfig) {
        this.hostConfig = hostConfig;
    }
    callback(srvRequest, srvResponse) {
        let options = this.BuildOptions(srvRequest);
        let hasHeaderSet = false;
        srvResponse.on('error', (err) => {
            console.error(err);
        });
        let clientDataCallback = (data, cliResponse) => {
            if (!hasHeaderSet) {
                hasHeaderSet = true;
                this.SetHeaders(cliResponse, srvResponse);
                srvResponse.statusCode = cliResponse.statusCode;
            }
            srvResponse.write(data);
        };
        let clientDataEndCallback = () => {
            srvResponse.end();
        };
        let errorCallback = (err) => {
            srvResponse.statusCode = 500;
            srvResponse.end();
        };
        const httpClient = new HttpClient_1.default(options, clientDataCallback, clientDataEndCallback, errorCallback);
        this.SetHeaders1(srvRequest, httpClient.request);
        HttpServerbase.processRequestData(srvRequest, (data) => {
            httpClient.Send(data);
        }, () => {
            httpClient.SendEnd();
        }, (err) => {
            srvResponse.statusCode = 500;
        });
    }
    SetHeaders(fromResponse, toResponse) {
        for (const header in fromResponse.headers) {
            if (fromResponse.headers.hasOwnProperty(header)) {
                const headerData = fromResponse.headers[header];
                toResponse.setHeader(header, headerData);
            }
        }
    }
    SetHeaders1(fromResponse, toRequest) {
        for (const header in fromResponse.headers) {
            if (fromResponse.headers.hasOwnProperty(header)) {
                const headerData = fromResponse.headers[header];
                toRequest.setHeader(header, headerData);
            }
        }
    }
    BuildOptions(srvRequest) {
        return {
            host: "127.0.0.1",
            path: srvRequest.url,
            method: srvRequest.method,
            port: 8080
        };
    }
    static processRequestData(srvRequest, forwardDataCallback, forwardDataEndCallback, forwardErrorCallback) {
        srvRequest.on("data", (data) => {
            forwardDataCallback(data);
        });
        srvRequest.on("end", () => {
            forwardDataEndCallback();
        });
        srvRequest.on("error", (err) => {
            forwardErrorCallback(err);
        });
    }
}
exports.HttpServerbase = HttpServerbase;
exports.default = HttpServerbase;
//# sourceMappingURL=HttpServerbase.js.map