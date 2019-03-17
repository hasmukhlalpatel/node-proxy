import { HttpContext } from "../HttpContext";

export abstract class HandlerBase {
    public abstract ProcessRequest(httpContext: HttpContext): boolean;
}
