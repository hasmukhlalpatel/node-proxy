//https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/
import * as http from 'http'
import {RequestHeaders,ResponseHeaders} from "./HeaderPrcoessor";
import {IncomingMessageProcessor} from "./IncomingMessageProcessor";


export class HttpClient{

    public request: http.ClientRequest;
    
    constructor(public options: http.RequestOptions, srvResponse: http.ServerResponse){
        let hasHeaderSet = false;
        this.request = http.request(this.options, (response: http.IncomingMessage)=>{

            let clientDataCallback =  (data:string|Buffer, cliResponse: http.IncomingMessage)=>{
                if(!hasHeaderSet){
                    hasHeaderSet = true;
                    new ResponseHeaders(cliResponse, srvResponse).SetHeaders();
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

            let resProcessor = new IncomingMessageProcessor(response, clientDataCallback,clientDataEndCallback, errorCallback);
         });

    }

    public Send(data:string|Buffer = null) {
        if(data != null && data.length>0){
            this.request.write(data);
        }
    }

    public SendEnd() {
        this.request.end();
    }
}

