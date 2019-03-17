"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpContext {
    constructor(hostConfig, request, response) {
        this.hostConfig = hostConfig;
        this.request = request;
        this.response = response;
    }
    get HostConfig() {
        return this.hostConfig;
    }
    get Request() {
        return this.request;
    }
    get Response() {
        return this.response;
    }
}
exports.HttpContext = HttpContext;
//# sourceMappingURL=HttpContext.js.map