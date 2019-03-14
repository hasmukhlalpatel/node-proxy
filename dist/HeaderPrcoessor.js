"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HeaderPrcoessor {
}
exports.HeaderPrcoessor = HeaderPrcoessor;
class HttpHeadersBase {
    constructor(fromMessage) {
        this.fromMessage = fromMessage;
    }
    SetHeaders() {
        for (const header in this.fromMessage.headers) {
            if (this.fromMessage.headers.hasOwnProperty(header)) {
                const headerData = this.fromMessage.headers[header];
                this.setHeader(header, headerData);
            }
        }
    }
}
exports.HttpHeadersBase = HttpHeadersBase;
class ResponseHeaders extends HttpHeadersBase {
    constructor(fromMessage, response) {
        super(fromMessage);
        this.response = response;
    }
    GetHeaders() {
        return this.fromMessage.headers;
    }
    setHeader(name, value) {
        this.response.setHeader(name, value);
    }
}
exports.ResponseHeaders = ResponseHeaders;
class RequestHeaders extends HttpHeadersBase {
    constructor(fromMessage, request) {
        super(fromMessage);
        this.request = request;
    }
    GetHeaders() {
        return this.fromMessage.headers;
    }
    setHeader(name, value) {
        this.request.setHeader(name, value);
    }
}
exports.RequestHeaders = RequestHeaders;
//# sourceMappingURL=HeaderPrcoessor.js.map