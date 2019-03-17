import { HttpContext } from "../HttpContext";
import { Middlewarebase } from "./Middleware";
export class LoggerMiddleware extends Middlewarebase {
    constructor(next: (httpContext: HttpContext) => void) {
        super(next);
    }
    public Invoke(httpContext: HttpContext): void {
        if(httpContext.Request != null)
            console.log(`Logger: ${httpContext.Request.url}`);
            else
            console.log(`No Url`);
        this.next(httpContext);
    }
}
