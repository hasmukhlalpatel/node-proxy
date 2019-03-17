"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("./HttpClient");
const IncomingMessageProcessor_1 = require("./IncomingMessageProcessor");
const HeaderPrcoessor_1 = require("./HeaderPrcoessor");
const HttpContext_1 = require("./HttpContext");
class HttpServerbase {
    constructor(hostConfig) {
        this.hostConfig = hostConfig;
    }
    static InvokeMiddlewares(httpContext) {
        HttpServerbase.middlewares.forEach(middleware => {
            middleware.Invoke(httpContext);
        });
    }
    callback(srvRequest, srvResponse) {
        let httpContext = new HttpContext_1.HttpContext(this.hostConfig, srvRequest, srvResponse);
        HttpServerbase.InvokeMiddlewares(httpContext);
        let options = this.BuildOptions(srvRequest);
        if (options == null) {
            srvResponse.end("No route found");
            srvResponse.statusCode = 500;
            return;
        }
        srvResponse.on('error', (err) => {
            console.error(err);
        });
        const httpClient = new HttpClient_1.HttpClient(options, srvResponse);
        new HeaderPrcoessor_1.RequestHeaders(srvRequest, httpClient.request).SetHeaders();
        let reqProcessor = new IncomingMessageProcessor_1.IncomingMessageProcessor(srvRequest, (data) => {
            httpClient.Send(data);
        }, () => {
            httpClient.SendEnd();
        }, (err) => {
            srvResponse.statusCode = 500;
        });
    }
    BuildOptions(srvRequest) {
        let tempPath = srvRequest.url;
        var route = this.hostConfig.Routes.find(x => { return tempPath.match(x.Path) != null; });
        if (route != null) {
            let newPath = srvRequest.url;
            if (route.TargetPath != null) {
                let regExResult = tempPath.match(route.Path);
                newPath = route.TargetPath.replace(/\s?\{[^}]+\}/g, (loc) => { return regExResult[loc]; });
            }
            return {
                host: route.TargetHost,
                path: newPath,
                method: srvRequest.method,
                port: 8080
            };
        }
    }
}
HttpServerbase.middlewares = [];
exports.HttpServerbase = HttpServerbase;
//# sourceMappingURL=HttpServerbase.js.map