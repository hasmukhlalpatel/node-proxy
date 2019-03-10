//https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/
import * as https from 'https'
import HttpServerbase from "./HttpServerbase"

export class  HttpsServer extends HttpServerbase{

    public server : https.Server;
    public options: https.ServerOptions;

    private port : number;

    constructor(port:number, options?: https.ServerOptions){
        super();        
        this.port = port;
        this.options = options;
        this.server = https.createServer(options, this.callback);
    }



    public listen() {
        this.server.listen(this.port);
    }
}

export default HttpsServer;
