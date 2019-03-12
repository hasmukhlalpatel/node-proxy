export class HostConfig {
    public Host : string;
    public Port? : number;
    public IsHttps?:boolean;
    public KeyFile? : string;
    public CertFile? : string;
    public Routes?: RouteConfig[];

    public static Load(path:string): HostConfig[]{
        return [{
            Host:"localhost",
            Port : 5001
        }];
    }
}
export default HostConfig;

export class RouteConfig{
    public Path : string;
    public TargetHost : string;
    public TargetPort? : number;
}
