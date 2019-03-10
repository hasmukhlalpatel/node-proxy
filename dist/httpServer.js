"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/
const http = require("http");
const HttpServerbase_1 = require("./HttpServerbase");
class HttpServer extends HttpServerbase_1.default {
    constructor(port, options) {
        super();
        this.port = port;
        this.options = options;
        this.server = http.createServer(this.callback);
    }
    listen() {
        this.server.listen(this.port);
    }
}
exports.HttpServer = HttpServer;
exports.default = HttpServer;
//# sourceMappingURL=httpServer.js.map