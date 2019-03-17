import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import { HttpContext } from "../HttpContext";
import { HandlerBase } from "./HandlerBase";

export class StaticFileHandler extends HandlerBase {
    public ProcessRequest(httpContext: HttpContext): boolean {
        let request = httpContext.Request;
        let response = httpContext.Response;
        console.log(`${request.method} ${request.url}`);

        // parse URL
        const parsedUrl = url.parse(request.url);
        // extract URL path
        let pathname = `.${parsedUrl.pathname}`;
        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        const ext = path.parse(pathname).ext;
        // maps file extention to MIME typere
        const map = {
          '.ico': 'image/x-icon',
          '.html': 'text/html',
          '.js': 'text/javascript',
          '.json': 'application/json',
          '.css': 'text/css',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.wav': 'audio/wav',
          '.mp3': 'audio/mpeg',
          '.svg': 'image/svg+xml',
          '.pdf': 'application/pdf',
          '.doc': 'application/msword'
        };
      
        fs.exists(pathname, function (exist) {
          if(!exist) {
            // if the file is not found, return 404
            response.statusCode = 404;
            response.end(`File ${pathname} not found!`);
            return  true;
          }
      
          // if is a directory search for index file matching the extention
          if (fs.statSync(pathname).isDirectory()) pathname += '/index' + ext;
      
          // read file from file system
          fs.readFile(pathname, function(err, data){
            if(err){
              response.statusCode = 500;
              response.end(`Error getting the file: ${err}.`);
            } else {
                // if the file is found, set Content-type and send data
                response.setHeader('Content-type', map[ext] || 'text/plain' );
                // Website you wish to allow to connect
                response.setHeader('Access-Control-Allow-Origin', '*');
    
                // Request methods you wish to allow
                response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
                // Request headers you wish to allow
                response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
                // Set to true if you need the website to include cookies in the requests sent
                // to the API (e.g. in case you use sessions)
                response.setHeader('Access-Control-Allow-Credentials', 'true');
    
              response.end(data);
            }
          });
        });

        return true;
    }
}
