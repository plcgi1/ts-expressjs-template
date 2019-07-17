"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 8080; // default port to listen
function loggerMiddleware(request, response, next) {
    const data = Object.keys(request.query).length > 0
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
app.get("/", (req, res) => {
    res.send({
        hostname: req.hostname,
        method: req.method,
        path: req.path
    });
});
app.post("/", (req, res) => {
    res.json(req.body);
});
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map