import { HttpContext } from "../HttpContext";
import { Middlewarebase } from "./Middleware";
export class StaticFileMiddleware extends Middlewarebase {
    constructor(next: (httpContext: HttpContext) => void) {
        super(next);
    }
    public Invoke(httpContext: HttpContext): void {
        console.log("LoggerMiddleware3");
        this.next(httpContext);
    }
}

