"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = require("./Middleware");
class LoggerMiddleware extends Middleware_1.Middlewarebase {
    constructor(next) {
        super(next);
    }
    Invoke(httpContext) {
        if (httpContext.Request != null)
            console.log(`Logger: ${httpContext.Request.url}`);
        else
            console.log(`No Url`);
        this.next(httpContext);
    }
}
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=LoggerMiddleware.js.map