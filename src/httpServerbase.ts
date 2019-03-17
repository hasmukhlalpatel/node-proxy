import * as http from 'http'
import {HttpClient} from "./HttpClient"
import {HostConfig, RouteConfig} from "./HostConfig"
import {IncomingMessageProcessor} from "./IncomingMessageProcessor";
import {RequestHeaders,ResponseHeaders} from "./HeaderPrcoessor";
import {HttpContext} from "./HttpContext"
// import { App } from './App';
import {Middlewarebase} from "./Middlewares/Middleware";


export abstract class HttpServerbase{

    public static middlewares : Middlewarebase[] = [];

    constructor(protected hostConfig :HostConfig) {
        
    }

    public static InvokeMiddlewares(httpContext: HttpContext){
        HttpServerbase.middlewares[0].Invoke(httpContext);
    }

    public abstract listen():void;

    protected callback(srvRequest: http.IncomingMessage, srvResponse: http.ServerResponse): void{

        let httpContext = new HttpContext(this.hostConfig, srvRequest, srvResponse);
        HttpServerbase.InvokeMiddlewares(httpContext);
    }
}