# build
- The `postinstall` script uses the TypeScript compiler to translate the source into JavaScript in the 'dist' folder.
- The `watch` script runs the TypeScript compiler in 'watch' mode: whenever the TypeScript source is modified, it is transpiled into the 'dist' folder.
- The `debug` script uses 'nodemon' to watch for changes in the 'dist' folder and restart the node runtime in debug mode.
- The `docker-debug` script creates a docker image for debugging.
- The `start` script runs the server in production mode.
# Commands 
- `npm run build` to build application.
- `npm run tsc` to compile the application.
- `npm run watch` to develop and compile the application.
- `npm start` to launch the application.


You can now run the server locally with these steps:
```sh
npm install
npm start
```
Then open a browser on http://localhost:5000.

## Running in Docker
You can build and run a docker image 'server' with these steps:

```sh
docker build -t server .
docker run -p 5000:5000 server
```
For the modified Docker setup we use 'docker-compose' because it allows us to override individual steps in the 'Dockerfile'.
The `docker-compose.yml` will be used when running the docker-compose from the command line:
```sh
docker-compose up
```


<!-- https://github.com/Microsoft/vscode-recipes/tree/master/Docker-TypeScript -->