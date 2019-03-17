"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpServerbase_1 = require("./HttpServerbase");
const httpServer_1 = require("./httpServer");
const httpsServer_1 = require("./httpsServer");
const HostConfig_1 = require("./HostConfig");
const Middleware_1 = require("./Middlewares/Middleware");
const LoggerMiddleware_1 = require("./Middlewares/LoggerMiddleware");
const StaticFileMiddleware_1 = require("./Middlewares/StaticFileMiddleware");
class App {
    constructor() {
        this.httpHosts = [];
    }
    static UseMiddleware(type, order) {
        App.middlewareTypes[order] = type;
    }
    static InitMiddlewares() {
        let lastMiddleware = null;
        let middlewareTypes = App.middlewareTypes;
        for (let index = middlewareTypes.length; index >= 0; index--) {
            const type = App.middlewareTypes[index];
            if (type != undefined) {
                const currentMiddleware = lastMiddleware;
                let nextMiddleware = (httpContext) => {
                    if (currentMiddleware != null) {
                        currentMiddleware.Invoke(httpContext);
                    }
                    else {
                        console.log("Default");
                    }
                };
                lastMiddleware = new type(nextMiddleware);
                App.middlewares.push(lastMiddleware);
            }
        }
        App.middlewares = App.middlewares.reverse();
        HttpServerbase_1.HttpServerbase.middlewares = App.middlewares;
    }
    static InvokeMiddlewares(httpContext) {
        App.middlewares[0].Invoke(httpContext);
    }
    Run() {
        App.InitMiddlewares();
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
exports.App = App;
process.on('uncaughtException', function (err) {
    // handle the error safely
    console.log(err);
});
App.UseMiddleware(Middleware_1.Middleware, 1);
App.UseMiddleware(LoggerMiddleware_1.LoggerMiddleware, 2);
App.UseMiddleware(StaticFileMiddleware_1.StaticFileMiddleware, 3);
//App.InitMiddlewares();
//App.InvokeMiddlewares(new HttpContext(null,null ,null));
let app = new App();
app.Run();
//# sourceMappingURL=App.js.map