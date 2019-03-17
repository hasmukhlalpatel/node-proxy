"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpContext_1 = require("./HttpContext");
class HttpServerbase {
    constructor(hostConfig) {
        this.hostConfig = hostConfig;
    }
    static InvokeMiddlewares(httpContext) {
        HttpServerbase.middlewares[0].Invoke(httpContext);
    }
    callback(srvRequest, srvResponse) {
        let httpContext = new HttpContext_1.HttpContext(this.hostConfig, srvRequest, srvResponse);
        HttpServerbase.InvokeMiddlewares(httpContext);
    }
}
HttpServerbase.middlewares = [];
exports.HttpServerbase = HttpServerbase;
//# sourceMappingURL=HttpServerbase.js.map