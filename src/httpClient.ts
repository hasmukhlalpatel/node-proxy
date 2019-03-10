//https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/
import * as http from 'http'
import HttpClientServerProxy from "./HttpClientServerProxy"


export class HttpClient{

    private dataRecvCallback: (data:string, response: http.IncomingMessage)=> void;
    
    public request: http.ClientRequest;
    
    constructor(public options: http.RequestOptions){
         this.request = http.request(this.options, (response: http.IncomingMessage)=>{
            let resData='';
   
            response.on("data",(data)=>{
                resData+=data;
            });
    
            response.on("end",()=>{
                console.log(`${resData.length} received`);
                this.dataRecvCallback(resData, response);
            });
         });
    }

    private callback(response: http.IncomingMessage):void{
        let resData='';
        let self = this;

        response.on("data",(data)=>{
            resData+=data;
        });

        response.on("end",()=>{
            console.log(resData);
            this.dataRecvCallback(resData, response);
        });
    }

    /**
     * Send
     */
    public Send(data:string = null) {
        if(data != null && data.length>0){
            this.request.write(data);
        }
        this.request.end();
    }

    public OnData(dataCallback : (data:string, response: http.IncomingMessage)=> void): void {
        this.dataRecvCallback = dataCallback;

    }
}

export default HttpClient;
