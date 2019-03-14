"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/
const http = require("http");
class HttpClient {
    constructor(options, dataCallback, dataEndCallback, errorCallback) {
        this.options = options;
        this.request = http.request(this.options, (response) => {
            response.on("data", (data) => {
                dataCallback(data, response);
            });
            response.on("end", () => {
                dataEndCallback();
            });
            response.on("error", (err) => {
                errorCallback(err);
            });
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