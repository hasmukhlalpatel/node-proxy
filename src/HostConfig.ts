export class HostConfig {
    public Host : string;
    public Port? : number;
    public IsHttps?:boolean;
    public KeyFile? : string;
    public PassPhrase? : string;
    public CertFile? : string;
    public Routes?: RouteConfig[];
    public StaticFilePath? : string;

    public static Load(path:string): HostConfig[]{
        return [{
            Host:"localhost",
            Port : 5000,
            Routes:[
                {
                    Path: "/sales/(.*)",
                    TargetHost: "serverSales",
                    TargetPort: 8080,
                    TargetPath : "sales?{R:1}"
                },
                {
                    Path: "/accounts/(.*)",
                    TargetHost: "serverAcc",
                    TargetPort: 8080,
                    TargetPath : "accounts?{R:1}"
                },
                {
                    Path: "/hr/(.*)",
                    TargetHost: "serverHr",
                    TargetPort: 8080,
                    TargetPath : "hr?{R:1}"
                }
            ]
        }];
    }
}

export class RouteConfig{
    public Path : string;
    public TargetHost : string;
    public TargetPort? : number;
    public TargetPath? : string;
}
