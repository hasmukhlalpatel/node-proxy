"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/
const http = require("http");
class HttpClient {
    constructor(options) {
        this.options = options;
        this.request = http.request(this.options, (response) => {
            let resData = '';
            response.on("data", (data) => {
                resData += data;
            });
            response.on("end", () => {
                console.log(`${resData.length} received`);
                this.dataRecvCallback(resData, response);
            });
        });
    }
    callback(response) {
        let resData = '';
        let self = this;
        response.on("data", (data) => {
            resData += data;
        });
        response.on("end", () => {
            console.log(resData);
            this.dataRecvCallback(resData, response);
        });
    }
    /**
     * Send
     */
    Send(data = null) {
        if (data != null && data.length > 0) {
            this.request.write(data);
        }
        this.request.end();
    }
    OnData(dataCallback) {
        this.dataRecvCallback = dataCallback;
    }
}
exports.HttpClient = HttpClient;
exports.default = HttpClient;
//# sourceMappingURL=HttpClient.js.map