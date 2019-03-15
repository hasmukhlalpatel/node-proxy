"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/
const http = require("http");
const HeaderPrcoessor_1 = require("./HeaderPrcoessor");
const IncomingMessageProcessor_1 = require("./IncomingMessageProcessor");
class HttpClient {
    constructor(options, srvResponse) {
        this.options = options;
        let hasHeaderSet = false;
        this.request = http.request(this.options, (response) => {
            let clientDataCallback = (data, cliResponse) => {
                if (!hasHeaderSet) {
                    hasHeaderSet = true;
                    new HeaderPrcoessor_1.ResponseHeaders(cliResponse, srvResponse).SetHeaders();
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
            let resProcessor = new IncomingMessageProcessor_1.IncomingMessageProcessor(response, clientDataCallback, clientDataEndCallback, errorCallback);
        });
    }
    Send(data = null) {
        if (data != null && data.length > 0) {
            this.request.write(data);
        }
    }
    SendEnd() {
        this.request.end();
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=HttpClient.js.map