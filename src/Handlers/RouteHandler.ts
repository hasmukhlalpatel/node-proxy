import * as http from 'http'
import { HttpClient } from "../HttpClient";
import { IncomingMessageProcessor } from "../IncomingMessageProcessor";
import { RequestHeaders } from "../HeaderPrcoessor";
import { HttpContext } from "../HttpContext";
import { HandlerBase } from "./HandlerBase";

export class RouteHandler extends HandlerBase {
    public ProcessRequest(httpContext: HttpContext): boolean {
        let srvRequest = httpContext.Request; //: http.IncomingMessage
        let srvResponse = httpContext.Response; // : http.ServerResponse
        let options = RouteHandler.BuildOptions(httpContext);
        if (options == null) {
            return false;
        }
        srvResponse.on('error', (err) => {
            console.error(err);
        });
        const httpClient = new HttpClient(options, srvResponse);
        new RequestHeaders(srvRequest, httpClient.request).SetHeaders();
        let reqProcessor = new IncomingMessageProcessor(srvRequest, (data: string | Buffer) => {
            httpClient.Send(data);
        }, () => {
            httpClient.SendEnd();
        }, (err: Error) => {
            srvResponse.statusCode = 500;
        });

        return true;
    }

    private static BuildOptions(httpContext: HttpContext): http.RequestOptions {
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

