"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("../HttpClient");
const IncomingMessageProcessor_1 = require("../IncomingMessageProcessor");
const HeaderPrcoessor_1 = require("../HeaderPrcoessor");
const HandlerBase_1 = require("./HandlerBase");
class RouteHandler extends HandlerBase_1.HandlerBase {
    ProcessRequest(httpContext) {
        let srvRequest = httpContext.Request; //: http.IncomingMessage
        let srvResponse = httpContext.Response; // : http.ServerResponse
        let options = RouteHandler.BuildOptions(httpContext);
        if (options == null) {
            return false;
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
        return true;
    }
    static BuildOptions(httpContext) {
        let srvRequest = httpContext.Request;
        let tempPath = srvRequest.url;
        var route = httpContext.HostConfig.Routes.find(x => { return tempPath.match(x.Path) != null; });
        if (route != null) {
            let targetPath = srvRequest.url;
            if (route.TargetPath != null) {
                let regExResult = tempPath.match(route.Path);
                targetPath = route.TargetPath.replace(/\s?\{[^}]+\}/g, (loc) => { return regExResult[loc]; });
            }
            return {
                host: route.TargetHost,
                path: targetPath,
                method: srvRequest.method,
                port: route.TargetPort
            };
        }
    }
}
exports.RouteHandler = RouteHandler;
//# sourceMappingURL=RouteHandler.js.map