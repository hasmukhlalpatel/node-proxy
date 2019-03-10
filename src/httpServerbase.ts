import * as http from 'http'
import HttpClient from "./HttpClient"
import HttpClientServerProxy from "./HttpClientServerProxy"


export class  HttpServerbase{

    protected callback(srvRequest: http.IncomingMessage, srvResponse: http.ServerResponse): void{

        let options = this.BuildOptions(srvRequest);
        let hasHeaderSet = false;

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

        const httpClient = new HttpClient(options, clientDataCallback, clientDataEndCallback);

        this.SetHeaders1(srvRequest, httpClient.request);

        HttpServerbase.processRequestData(srvRequest, (data: string|Buffer)=>{
            httpClient.Send(data);
        },()=>{
            httpClient.SendEnd(); 
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
         forwardDataEndCallback: ()=>void ):void {
       
        srvRequest.on("data",(data:string|Buffer)=>{
            forwardDataCallback(data);
        });

        srvRequest.on("end",()=>{
            forwardDataEndCallback();
        });
    }
}

export default HttpServerbase;