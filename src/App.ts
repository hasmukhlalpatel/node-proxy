import HttpServerbase from "./HttpServerbase"
import HttpServer from "./httpServer"
import HttpsServer from "./httpsServer"
import { port } from "_debugger";

export class App
{
    private http : HttpServer;

    constructor(private port:number) {
        this.http = new HttpServer(port);
    }

    Run()
    {
        this.http.listen();
        console.log("http servr runing on " + this.port);
    }
}

let app = new App(5000);
app.Run();