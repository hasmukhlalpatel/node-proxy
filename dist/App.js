"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpServer_1 = require("./httpServer");
class App {
    constructor(port) {
        this.port = port;
        this.http = new httpServer_1.default(port);
    }
    Run() {
        this.http.listen();
        console.log("http servr runing on " + this.port);
    }
}
exports.App = App;
let app = new App(5000);
app.Run();
//# sourceMappingURL=App.js.map