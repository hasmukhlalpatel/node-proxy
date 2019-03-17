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

        let options = this.BuildOptions(srvRequest);
        if(options == null){
            srvResponse.end("No route found");
            srvResponse.statusCode = 500;
            return;
        }
 
        srvResponse.on('error', (err) => {
            console.error(err);
        });

        const httpClient = new HttpClient(options, srvResponse);

        new RequestHeaders(srvRequest, httpClient.request).SetHeaders();

        let reqProcessor = new IncomingMessageProcessor(srvRequest, (data: string|Buffer)=>{
            httpClient.Send(data);
        },()=>{
            httpClient.SendEnd(); 
        },(err: Error)=>{
            srvResponse.statusCode = 500;
        } );
    }

    private BuildOptions(srvRequest: http.IncomingMessage) : http.RequestOptions{
        let tempPath = srvRequest.url;
        var route = this.hostConfig.Routes.find(x=>{ return tempPath.match(x.Path) != null });
       
        if(route != null){
            let targetPath =  srvRequest.url;
            if(route.TargetPath != null){
                let regExResult = tempPath.match(route.Path);
                targetPath = route.TargetPath.replace(/\s?\{[^}]+\}/g, (loc)=>{ return regExResult[loc]; });
            }

            return {
                host : route.TargetHost,
                path : targetPath,
                method : srvRequest.method,
                port : route.TargetPort
            };
        }
        
    }
}

