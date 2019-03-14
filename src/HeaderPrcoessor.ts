import * as http from 'http'

export class HeaderPrcoessor{

}

export interface IHttpHeaders{
    SetHeaders():void;
}

export abstract class HttpHeadersBase implements IHttpHeaders{
    constructor(protected fromMessage: http.IncomingMessage) {
       
    }

    protected abstract GetHeaders():any;
    protected abstract setHeader(name: string, value: string | string[]): void;
    public SetHeaders():void{
        for (const header in this.fromMessage.headers) {
            if (this.fromMessage.headers.hasOwnProperty(header)) {
                const headerData = this.fromMessage.headers[header];
                this.setHeader(header,headerData);
            }
        }
    }
}

export class ResponseHeaders extends HttpHeadersBase{
    constructor(fromMessage: http.IncomingMessage, private response: http.ServerResponse) {
        super(fromMessage);
    }

    protected GetHeaders():any{
        return this.fromMessage.headers;
    }
    protected setHeader(name: string, value: string | string[]): void{
        this.response.setHeader(name, value);
    }
}

export class RequestHeaders extends HttpHeadersBase{
    constructor(fromMessage: http.IncomingMessage,private  request: http.ClientRequest) {
        super(fromMessage);
    }

    protected GetHeaders():any{
        return this.fromMessage.headers;
    }

    protected setHeader(name: string, value: string | string[]): void{
        this.request.setHeader(name, value);
    }
}