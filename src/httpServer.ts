//https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/
import * as http from 'http'
import HttpServerbase from "./HttpServerbase"
import HostConfig from "./HostConfig"

export class  HttpServer extends HttpServerbase{

    public server : http.Server;
    public options: http.RequestOptions;
    
    constructor(hostConfig :HostConfig, options?: http.RequestOptions){
        super(hostConfig);
        this.options = options;
        this.server = http.createServer((req,res)=>{
            this.callback(req,res);
        });
    }

    public listen() {
        this.server.listen(this.hostConfig.Port,this.hostConfig.Host, 511,()=>{
            console.log( `Server listening on ${this.hostConfig.Host}:${this.hostConfig.Port}`); 
        });
    }
}

export default HttpServer;