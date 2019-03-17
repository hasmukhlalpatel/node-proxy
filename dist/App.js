"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpServerbase_1 = require("./HttpServerbase");
const httpServer_1 = require("./httpServer");
const httpsServer_1 = require("./httpsServer");
const HostConfig_1 = require("./HostConfig");
const Middleware_1 = require("./Middleware");
class App {
    constructor() {
        this.httpHosts = [];
    }
    //public static UseMiddleware<T extends Middlewarebase>(type: typeof Middlewarebase): T{
    static UseMiddleware(type) {
        //App.middlewareTypes.push(type);
        let middleware = new type(App.nextMiddleware);
        App.nextMiddleware = middleware.Invoke;
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
    static InvokeMiddlewares(httpContext) {
        App.middlewares.forEach(middleware => {
            middleware.Invoke(httpContext);
        });
    }
    Run() {
        //App.SetupMiddlewares();
        HttpServerbase_1.HttpServerbase.middlewares = App.middlewares;
        const routs = HostConfig_1.HostConfig.Load("./configs/");
        routs.forEach(x => {
            try {
                var hostname = `${x.Host}:${x.Port}`;
                const httpSrv = x.IsHttps ? new httpsServer_1.HttpsServer(x) : new httpServer_1.default(x);
                this.httpHosts[hostname] = httpSrv;
                httpSrv.listen();
            }
            catch (error) {
                console.error(`An error has occured while stating ${x.Host}:${x.Port}`);
            }
        });
    }
}
App.middlewareTypes = [];
App.middlewares = [];
App.nextMiddleware = (httpContext) => {
    console.log("Default");
};
exports.App = App;
process.on('uncaughtException', function (err) {
    // handle the error safely
    console.log(err);
});
App.UseMiddleware(Middleware_1.Middleware);
App.UseMiddleware(Middleware_1.LoggerMiddleware);
let app = new App();
app.Run();
//# sourceMappingURL=App.js.map