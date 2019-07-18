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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = __importDefault(require("./middleware/error"));
// TODO add logger
// TODO add configuration with environment
class App {
    constructor(controllers) {
        this.app = express_1.default();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            // tslint:disable-next-line:no-console
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }
    connectToTheDatabase() {
        const { MONGO_DBNAME, MONGO_HOST, MONGO_PORT } = process.env;
        const MONGO_PATH = `${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;
        mongoose_1.default.connect(`mongodb://${MONGO_PATH}`);
        const db = mongoose_1.default.connection;
        db.on("connected", () => {
            // tslint:disable-next-line:no-console
            console.log(`Mongo connected ${MONGO_PATH}`);
        });
        db.on("disconnected", () => {
            // tslint:disable-next-line:no-console
            console.log("Mongoose default connection disconnected");
            db.close();
        });
        db.on("error", (err) => {
            // tslint:disable-next-line:no-console
            console.error("MongoDB connection error: " + err);
            db.close();
            process.exit(-1);
        });
        db.once("open", () => {
            // tslint:disable-next-line:no-console
            console.log("open.Mongoose default connection opened");
        });
        process.on("SIGINT", () => {
            db.close(() => {
                // tslint:disable-next-line:no-console
                console.log("Mongoose default connection disconnected through app termination");
                process.exit(0);
            });
        });
    }
    initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookie_parser_1.default());
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/api", controller.router);
        });
    }
    initializeErrorHandling() {
        this.app.use(error_1.default);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map