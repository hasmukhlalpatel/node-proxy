import {HttpServerbase} from "./HttpServerbase"
import HttpServer from "./httpServer"
import {HttpsServer} from "./httpsServer"
import {HostConfig} from "./HostConfig"

export class App
{
    private httpHosts : HttpServerbase[];

    constructor() {
        this.httpHosts =[];
    }

    Run()
    {
        const routs = HostConfig.Load("./configs/");

        routs.forEach(x=>{
            try {
                var hostname = `${x.Host}:${x.Port}`;
                const httpSrv = x.IsHttps? new HttpsServer(x):  new HttpServer(x);
                this.httpHosts[hostname] = httpSrv;
                httpSrv.listen();

            } catch (error) {
                console.error(`An error has occured while stating ${x.Host}:${x.Port}` );        
            }
        });
    }
}

process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log(err)
})

let app = new App();
app.Run();