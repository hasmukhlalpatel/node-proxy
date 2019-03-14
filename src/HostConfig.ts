export class HostConfig {
    public Host : string;
    public Port? : number;
    public IsHttps?:boolean;
    public KeyFile? : string;
    public PassPhrase? : string;
    public CertFile? : string;
    public Routes?: RouteConfig[];

    public static Load(path:string): HostConfig[]{
        return [{
            Host:"localhost",
            Port : 5000,
            Routes:[
                {
                    Path: "/test$",
                    TargetHost: "192.168.1.51",
                    TargetPort: 8080
                }
            ]
        }];
    }
}

export class RouteConfig{
    public Path : string;
    public TargetHost : string;
    public TargetPort? : number;
}
