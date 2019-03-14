"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/
const https = require("https");
const HttpServerbase_1 = require("./HttpServerbase");
class HttpsServer extends HttpServerbase_1.HttpServerbase {
    constructor(hostConfig, options) {
        super(hostConfig);
        this.options = options;
        this.server = https.createServer(options, (req, res) => {
            this.callback(req, res);
        });
    }
    listen() {
        this.server.listen(this.hostConfig.Port, this.hostConfig.Host, 511, () => {
            console.log(`Server listening on ${this.hostConfig.Host}:${this.hostConfig.Port}`);
        });
    }
}
exports.HttpsServer = HttpsServer;
//# sourceMappingURL=httpsServer.js.map