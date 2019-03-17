"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = require("./Middleware");
const RouteHandler_1 = require("../Handlers/RouteHandler");
class ProxyMiddleware extends Middleware_1.Middlewarebase {
    constructor(next) {
        super(next);
    }
    Invoke(httpContext) {
        console.log("Proxy Middleware");
        if (!new RouteHandler_1.RouteHandler().ProcessRequest(httpContext)) {
            this.next(httpContext);
        }
    }
}
exports.ProxyMiddleware = ProxyMiddleware;
//# sourceMappingURL=ProxyMiddleware.js.map