import * as bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 8080; // default port to listen

function loggerMiddleware(request: express.Request, response: express.Response, next: any) {
    const data: string = Object.keys(request.query).length > 0
        ? JSON.stringify(request.query)
        : JSON.stringify(request.body);
    // tslint:disable-next-line:no-console
    console.log(`${request.method} ${request.path} ${data}`);
    next();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(loggerMiddleware);

// define a route handler for the default home page
app.get( "/", ( req: express.Request, res: express.Response ) => {
    res.send({
        hostname: req.hostname,
        method: req.method,
        path: req.path
    });
} );

app.post("/", (req: express.Request, res: express.Response) => {
    res.json(req.body);
});

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
