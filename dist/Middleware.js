"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Middlewarebase {
    constructor(next) {
        this.next = next;
    }
}
exports.Middlewarebase = Middlewarebase;
class Middleware extends Middlewarebase {
    constructor(next) {
        super(next);
    }
    Invoke(httpContext) {
        console.log("Middleware");
        this.next(httpContext);
    }
}
exports.Middleware = Middleware;
class LoggerMiddleware extends Middlewarebase {
    constructor(next) {
        super(next);
    }
    Invoke(httpContext) {
        console.log("LoggerMiddleware");
        this.next(httpContext);
    }
}
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=Middleware.js.map