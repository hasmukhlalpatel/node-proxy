import * as http from 'http'
import {HttpClient} from "./HttpClient"
import {HostConfig, RouteConfig} from "./HostConfig"
import {IncomingMessageProcessor} from "./IncomingMessageProcessor";
import {RequestHeaders,ResponseHeaders} from "./HeaderPrcoessor";

export abstract class HttpServerbase{

    constructor(protected hostConfig :HostConfig) {
        
    }

    public abstract listen():void;

    protected callback(srvRequest: http.IncomingMessage, srvResponse: http.ServerResponse): void{

        let options = this.BuildOptions(srvRequest);
 
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
        return {
            host : "192.168.1.51",
            path : srvRequest.url,
            method : srvRequest.method,
            port : 8080
        };
    }
}
