import * as http from 'http'
import HttpClient from "./HttpClient"
import HttpClientServerProxy from "./HttpClientServerProxy"


export class  HttpServerbase{

    protected callback(srvRequest: http.IncomingMessage, srvResponse: http.ServerResponse): void{
        const httpClient = HttpServerbase.BuildHttpClient(srvRequest);

        httpClient.OnData((data:string, cliResponse: http.IncomingMessage)=>{
            for (const header in cliResponse.headers) {
                if (cliResponse.headers.hasOwnProperty(header)) {
                    const headerData = cliResponse.headers[header];
                    srvResponse.setHeader(header,headerData);
                }
            }
            srvResponse.statusCode = cliResponse.statusCode;
            //srvResponse.write(data);
            srvResponse.end(data);
        });

        HttpServerbase.processRequestData(srvRequest, (data: string)=>{
            httpClient.Send(data);
        });
    }

    private static BuildHttpClient(srvRequest: http.IncomingMessage) : HttpClient {

        let options = {
            host : "127.0.0.1",
            path : srvRequest.url,
            method : srvRequest.method,
            port : 8080
        };

        const httpClient = new HttpClient(options);

        for (const header in srvRequest.headers) {
            if (srvRequest.headers.hasOwnProperty(header)) {
                const headerData = srvRequest.headers[header];
                httpClient.request.setHeader(header,headerData);
            }
        }
        return httpClient;
    }

    private static processRequestData(srvRequest: http.IncomingMessage, forwardMsgCallback : (data:string)=> void ):void {

        let reqData='';
        
        srvRequest.on("data",(data)=>{
            reqData+=data;
        });

        srvRequest.on("end",()=>{
            forwardMsgCallback(reqData);
        });
    }
}

export default HttpServerbase;