"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HostConfig {
    static Load(path) {
        return [{
                Host: "localhost",
                Port: 5000,
                Routes: [
                    {
                        Path: "/page1/(.*)",
                        TargetHost: "192.168.1.51",
                        TargetPort: 8080,
                        TargetPath: "image/jpeg.cgi?{R:1}"
                    },
                    {
                        Path: "/page2/(.*)",
                        TargetHost: "192.168.1.52",
                        TargetPort: 8080
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