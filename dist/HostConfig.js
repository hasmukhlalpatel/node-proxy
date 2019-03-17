"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HostConfig {
    static Load(path) {
        return [{
                Host: "localhost",
                Port: 5000,
                Routes: [
                    {
                        Path: "/sales/(.*)",
                        TargetHost: "serverSales",
                        TargetPort: 8080,
                        TargetPath: "sales?{R:1}"
                    },
                    {
                        Path: "/accounts/(.*)",
                        TargetHost: "serverAcc",
                        TargetPort: 8080,
                        TargetPath: "accounts?{R:1}"
                    },
                    {
                        Path: "/hr/(.*)",
                        TargetHost: "serverHr",
                        TargetPort: 8080,
                        TargetPath: "hr?{R:1}"
                    }
                ]
            }];
    }
}
exports.HostConfig = HostConfig;
class RouteConfig {
}
exports.RouteConfig = RouteConfig;
//# sourceMappingURL=HostConfig.js.map