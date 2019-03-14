"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpServer_1 = require("./httpServer");
const httpsServer_1 = require("./httpsServer");
const HostConfig_1 = require("./HostConfig");
class App {
    constructor() {
        this.httpHosts = [];
    }
    Run() {
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
exports.App = App;
process.on('uncaughtException', function (err) {
    // handle the error safely
    console.log(err);
});
let app = new App();
app.Run();
//# sourceMappingURL=App.js.map