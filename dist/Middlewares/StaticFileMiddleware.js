"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = require("./Middleware");
class StaticFileMiddleware extends Middleware_1.Middlewarebase {
    constructor(next) {
        super(next);
    }
    Invoke(httpContext) {
        console.log("StaticFile Middleware");
        this.next(httpContext);
    }
}
exports.StaticFileMiddleware = StaticFileMiddleware;
//# sourceMappingURL=StaticFileMiddleware.js.map