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
//# sourceMappingURL=Middleware.js.map