import { HttpContext } from "../HttpContext";
import { Middlewarebase } from "./Middleware";
import { RouteHandler } from "../Handlers/RouteHandler";

export class ProxyMiddleware extends Middlewarebase {
    constructor(next: (httpContext: HttpContext) => void) {
        super(next);
    }
    public Invoke(httpContext: HttpContext): void {
        console.log("Proxy Middleware");
        if(! new RouteHandler().ProcessRequest(httpContext))
        {
            this.next(httpContext);
        }
    }
}
