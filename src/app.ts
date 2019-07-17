import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import errorMiddleware from "./middleware/error";

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: any) {
        this.app = express();

        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            // tslint:disable-next-line:no-console
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }

    private connectToTheDatabase() {
        const {
            MONGO_DBNAME,
            MONGO_HOST,
            MONGO_PORT
        } = process.env;

        const MONGO_PATH: string = `${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;

        mongoose.connect(`mongodb://${MONGO_PATH}`);

        const db = mongoose.connection;

        db.on("connected", () => {
            // tslint:disable-next-line:no-console
            console.log(`Mongo connected ${MONGO_PATH}`);
        });

        db.on("disconnected", () => {
            // tslint:disable-next-line:no-console
            console.log("Mongoose default connection disconnected");
            db.close();
        });

        db.on("error", (err: any) => {
            // tslint:disable-next-line:no-console
            console.error("MongoDB connection error: " + err);
            db.close();
            process.exit(-1);
        });

        db.once("open", () => {
            // tslint:disable-next-line:no-console
            console.log(
                "open.Mongoose default connection opened"
            );
        });

        process.on("SIGINT", () => {
            db.close(() => {
                // tslint:disable-next-line:no-console
                console.log("Mongoose default connection disconnected through app termination");
                process.exit(0);
            });
        });
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
    }

    private initializeControllers(controllers: any) {
        controllers.forEach((controller: any) => {
            this.app.use("/api", controller.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
}

export default App;
