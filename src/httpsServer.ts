//https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/
import * as https from 'https'
import HttpServerbase from "./HttpServerbase"
import HostConfig from "./HostConfig"

export class  HttpsServer extends HttpServerbase{

    public server : https.Server;
    public options: https.ServerOptions;

    constructor(hostConfig :HostConfig, options?: https.ServerOptions){
        super(hostConfig);
        this.options = options;
        this.server = https.createServer(options, (req, res)=>{
            this.callback(req,res);
        });
    }

    public listen() {
        this.server.listen(this.hostConfig.Port,this.hostConfig.Host, 511,()=>{
            console.log( `Server listening on ${this.hostConfig.Host}:${this.hostConfig.Port}`); 
        });
    }
}

export default HttpsServer;
