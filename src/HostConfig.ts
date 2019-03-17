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
                    Path: "/page1/(.*)",
                    TargetHost: "192.168.1.51",
                    TargetPort: 8080,
                    TargetPath : "image/jpeg.cgi?{R:1}"
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

export class RouteConfig{
    public Path : string;
    public TargetHost : string;
    public TargetPort? : number;
    public TargetPath? : string;
}
