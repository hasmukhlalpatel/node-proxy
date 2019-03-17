import {HttpServerbase} from "./HttpServerbase"
import HttpServer from "./httpServer"
import {HttpsServer} from "./httpsServer"
import {HostConfig} from "./HostConfig"
import {HttpContext} from "./HttpContext"
import {Middleware,LoggerMiddleware,Middlewarebase} from "./Middleware";

export class App
{
    private httpHosts : HttpServerbase[];

    constructor() {
        this.httpHosts =[];
    }

    private static middlewareTypes : typeof Middlewarebase[] = [];
    private static middlewares : Middlewarebase[] = [];

    private static nextMiddleware = (httpContext: HttpContext)=>{
        console.log("Default")
    };

    //public static UseMiddleware<T extends Middlewarebase>(type: typeof Middlewarebase): T{

    public static UseMiddleware<T extends Middlewarebase>(type: {new()  : T; }): T{
        //App.middlewareTypes.push(type);
        let middleware = new type(App.nextMiddleware);
        App.nextMiddleware= middleware.Invoke;
        App.middlewares.push(middleware);
        return middleware;
    }

    // public static SetupMiddlewares(){
    //     let nextMiddleware = (httpContext: HttpContext)=>{
    //         console.log("Default")
    //     };

    //     App.middlewareTypes.forEach(m => {
    //         let middleware = new m(nextMiddleware);
    //         nextMiddleware= middleware.Invoke;
    //         App.middlewares.push(middleware);
    //     }); 
    // }

    public static InvokeMiddlewares(httpContext: HttpContext){
            App.middlewares.forEach(middleware => {
                middleware.Invoke(httpContext);
            });
    }
    

    Run()
    {
        //App.SetupMiddlewares();
        HttpServerbase.middlewares = App.middlewares;
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

App.UseMiddleware<Middleware>(Middleware);
App.UseMiddleware<LoggerMiddleware>(LoggerMiddleware);


let app = new App();
app.Run();