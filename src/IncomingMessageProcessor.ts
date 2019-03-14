import * as http from 'http'

export class IncomingMessageProcessor{
    
    constructor(response: http.IncomingMessage,
        dataCallback : (data:string|Buffer,response: http.IncomingMessage)=> void,
        dataEndCallback : ()=> void,
        errorCallback : (err: Error)=> void) {
        
            response.on("data",(data:string|Buffer)=>{
                dataCallback(data,response);
            });
    
            response.on("end",()=>{
                dataEndCallback();
            });

            response.on("error", (err: Error)=>{
                errorCallback(err);
            });
    }
}