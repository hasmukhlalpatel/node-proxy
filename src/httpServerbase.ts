import * as http from 'http'
import HttpClient from "./HttpClient"
import HostConfig from "./HostConfig"

export abstract class  HttpServerbase{

    constructor(protected hostConfig :HostConfig) {
        
    }

    public abstract listen():void;

    protected callback(srvRequest: http.IncomingMessage, srvResponse: http.ServerResponse): void{

        let options = this.BuildOptions(srvRequest);
        let hasHeaderSet = false;

        srvResponse.on('error', (err) => {
            console.error(err);
        });

        let clientDataCallback =  (data:string|Buffer, cliResponse: http.IncomingMessage)=>{
            if(!hasHeaderSet){
                hasHeaderSet = true;
                this.SetHeaders(cliResponse, srvResponse);
                srvResponse.statusCode = cliResponse.statusCode;
            }
            srvResponse.write(data);
        };

        let clientDataEndCallback = ()=>{
            srvResponse.end();
        };

        let errorCallback = (err: Error)=>{
            srvResponse.statusCode = 500;
            srvResponse.end();
        }

        const httpClient = new HttpClient(options, clientDataCallback, clientDataEndCallback, errorCallback);

        this.SetHeaders1(srvRequest, httpClient.request);

        HttpServerbase.processRequestData(srvRequest, (data: string|Buffer)=>{
            httpClient.Send(data);
        },()=>{
            httpClient.SendEnd(); 
        },(err: Error)=>{
            srvResponse.statusCode = 500;

        } );
    }

    private SetHeaders(fromResponse: http.IncomingMessage, toResponse: http.ServerResponse) :void{
        for (const header in fromResponse.headers) {
                if (fromResponse.headers.hasOwnProperty(header)) {
                    const headerData = fromResponse.headers[header];
                    toResponse.setHeader(header,headerData);
                }
            }
    }
    
    private SetHeaders1(fromResponse: http.IncomingMessage, toRequest: http.ClientRequest) :void{
        for (const header in fromResponse.headers) {
                if (fromResponse.headers.hasOwnProperty(header)) {
                    const headerData = fromResponse.headers[header];
                    toRequest.setHeader(header,headerData);
                }
            }
    }

    private BuildOptions(srvRequest: http.IncomingMessage) : http.RequestOptions{
        return {
            host : "127.0.0.1",
            path : srvRequest.url,
            method : srvRequest.method,
            port : 8080
        };
    }


    private static processRequestData(srvRequest: http.IncomingMessage,
         forwardDataCallback : (data:string|Buffer)=> void,
         forwardDataEndCallback: ()=>void,
         forwardErrorCallback: (err: Error)=>void ):void {
       
        srvRequest.on("data",(data:string|Buffer)=>{
            forwardDataCallback(data);
        });

        srvRequest.on("end",()=>{
            forwardDataEndCallback();
        });

        srvRequest.on("error", (err: Error) => {
            forwardErrorCallback(err);
        });
    }
}

export default HttpServerbase;