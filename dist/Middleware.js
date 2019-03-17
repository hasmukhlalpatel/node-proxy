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
class LoggerMiddleware2 extends Middlewarebase {
    constructor(next) {
        super(next);
    }
    Invoke(httpContext) {
        console.log("LoggerMiddleware3");
        this.next(httpContext);
    }
}
exports.LoggerMiddleware2 = LoggerMiddleware2;
//# sourceMappingURL=Middleware.js.map