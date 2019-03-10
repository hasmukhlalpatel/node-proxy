"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("./HttpClient");
class HttpServerbase {
    callback(srvRequest, srvResponse) {
        const httpClient = HttpServerbase.BuildHttpClient(srvRequest);
        httpClient.OnData((data, cliResponse) => {
            for (const header in cliResponse.headers) {
                if (cliResponse.headers.hasOwnProperty(header)) {
                    const headerData = cliResponse.headers[header];
                    srvResponse.setHeader(header, headerData);
                }
            }
            srvResponse.statusCode = cliResponse.statusCode;
            //srvResponse.write(data);
            srvResponse.end(data);
        });
        HttpServerbase.processRequestData(srvRequest, (data) => {
            httpClient.Send(data);
        });
    }
    static BuildHttpClient(srvRequest) {
        let options = {
            host: "192.168.1.51",
            path: srvRequest.url,
            method: srvRequest.method,
            port: 8080
        };
        const httpClient = new HttpClient_1.default(options);
        for (const header in srvRequest.headers) {
            if (srvRequest.headers.hasOwnProperty(header)) {
                const headerData = srvRequest.headers[header];
                httpClient.request.setHeader(header, headerData);
            }
        }
        return httpClient;
    }
    static processRequestData(srvRequest, forwardMsgCallback) {
        let reqData = '';
        srvRequest.on("data", (data) => {
            reqData += data;
        });
        srvRequest.on("end", () => {
            forwardMsgCallback(reqData);
        });
    }
}
exports.HttpServerbase = HttpServerbase;
exports.default = HttpServerbase;
//# sourceMappingURL=HttpServerbase.js.map