import {HttpServerbase} from "./HttpServerbase"
import HttpServer from "./httpServer"
import {HttpsServer} from "./httpsServer"
import {HostConfig} from "./HostConfig"
import {HttpContext} from "./HttpContext"
import {Middleware,Middlewarebase} from "./Middlewares/Middleware";
import {LoggerMiddleware } from "./Middlewares/LoggerMiddleware";
import {StaticFileMiddleware} from "./Middlewares/StaticFileMiddleware"

import {IDictionary,Dictionary} from "./Dictionary";


export class App
{
    private httpHosts : HttpServerbase[];

    constructor() {
        this.httpHosts =[];
    }

    private static middlewareTypes : {[sort:number]: {new(arg:any)  : Middlewarebase; }} =[];

    private static middlewares : Middlewarebase[] = [];

    midd: {new(arg:any)  : Middlewarebase; }

    public static UseMiddleware<T extends Middlewarebase>(type: {new(arg:any)  : T; }, order: number){
        App.middlewareTypes[order] = type;
    }

    public static InitMiddlewares(): void{

        let lastMiddleware :Middlewarebase = null;

        let  middlewareTypes = App.middlewareTypes as Array<any>;

        for (let index = middlewareTypes.length; index >= 0; index--) {
            const type = App.middlewareTypes[index];
            if(type != undefined){
                const currentMiddleware  = lastMiddleware;
                let nextMiddleware = (httpContext: HttpContext)=>{
                    if(currentMiddleware != null)
                    {
                        currentMiddleware.Invoke(httpContext);
                    }else{
                        console.log("Default")
                    }
                };

                lastMiddleware = new type(nextMiddleware);
                App.middlewares.push(lastMiddleware);
            }
        }
        App.middlewares = App.middlewares.reverse();
        HttpServerbase.middlewares = App.middlewares;
    }

    public static InvokeMiddlewares(httpContext: HttpContext){
        App.middlewares[0].Invoke(httpContext);
    }
    

    Run()
    {
        App.InitMiddlewares();
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

App.UseMiddleware<Middleware>(Middleware,1);
App.UseMiddleware<LoggerMiddleware>(LoggerMiddleware,2);
App.UseMiddleware<StaticFileMiddleware>(StaticFileMiddleware,3);

//App.InitMiddlewares();
//App.InvokeMiddlewares(new HttpContext(null,null ,null));

let app = new App();
app.Run();