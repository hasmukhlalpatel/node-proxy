"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/
const http = require("http");
const HttpServerbase_1 = require("./HttpServerbase");
class HttpServer extends HttpServerbase_1.default {
    constructor(hostConfig, options) {
        super(hostConfig);
        this.options = options;
        this.server = http.createServer((req, res) => {
            this.callback(req, res);
        });
    }
    listen() {
        this.server.listen(this.hostConfig.Port, this.hostConfig.Host, 511, () => {
            console.log(`Server listening on ${this.hostConfig.Host}:${this.hostConfig.Port}`);
        });
    }
}
exports.HttpServer = HttpServer;
exports.default = HttpServer;
//# sourceMappingURL=httpServer.js.map