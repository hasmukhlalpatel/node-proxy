"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/
const https = require("https");
const HttpServerbase_1 = require("./HttpServerbase");
class HttpsServer extends HttpServerbase_1.default {
    constructor(port, options) {
        super();
        this.port = port;
        this.options = options;
        this.server = https.createServer(options, (req, res) => {
            this.callback(req, res);
        });
    }
    listen() {
        this.server.listen(this.port);
    }
}
exports.HttpsServer = HttpsServer;
exports.default = HttpsServer;
//# sourceMappingURL=httpsServer.js.map