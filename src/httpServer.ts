//https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/
import * as http from 'http'
import HttpServerbase from "./HttpServerbase"

export class  HttpServer extends HttpServerbase{

    public server : http.Server;
    public options: http.RequestOptions;

    private port : number;

    constructor(port:number, options?: http.RequestOptions){
        super();
        this.port = port;
        this.options = options;
        this.server = http.createServer(this.callback);
    }

    public listen() {
        this.server.listen(this.port);
    }
}

export default HttpServer;