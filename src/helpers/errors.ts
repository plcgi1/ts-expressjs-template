import { Response } from "express";
import HttpException from "../exceptions/http.exception";

export default function handleError(err: HttpException, response: Response) {
    // TODO add errors []
    // TODO add logger
    const res = { message: err.message };
    // tslint:disable-next-line:no-console
    console.error("ERROR", err);

    return response.status(err.status).json(res).end();
}
