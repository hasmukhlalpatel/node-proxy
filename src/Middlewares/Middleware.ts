import {HttpContext} from "../HttpContext"

export abstract class Middlewarebase{
    protected next: (httpContext: HttpContext)=>void;

    constructor(next: (httpContext: HttpContext)=>void) {
        this.next = next;
    }

    public abstract Invoke(httpContext: HttpContext):void;
}

export class Middleware extends Middlewarebase{


    constructor(next: (httpContext: HttpContext)=>void) {
        super(next);
    }

    public Invoke(httpContext: HttpContext):void{
        console.log("Middleware")
        this.next(httpContext);
    }
}


