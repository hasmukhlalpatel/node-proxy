export class HostConfig {
    public  Host : string;
    public  Port? : number;
    public  KeyFile? : string;
    public  CertFile? : string;

    public static Load(path:string): HostConfig[]{
        return [{
            Host:"localhost"
        }];
    }
}
export default HostConfig;

