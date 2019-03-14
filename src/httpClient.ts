//https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/
import * as http from 'http'

export class HttpClient{

    public request: http.ClientRequest;
    
    constructor(public options: http.RequestOptions,
        dataCallback : (data:string|Buffer,response: http.IncomingMessage)=> void,
        dataEndCallback : ()=> void,
        errorCallback : (err: Error)=> void){

            this.request = http.request(this.options, (response: http.IncomingMessage)=>{
            response.on("data",(data:string|Buffer)=>{
                dataCallback(data,response);
            });
    
            response.on("end",()=>{
                dataEndCallback();
            });

            response.on("error", (err: Error)=>{
                errorCallback(err);
            });
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

