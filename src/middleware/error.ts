import { NextFunction, Request, Response } from "express";

function errorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
    // tslint:disable-next-line:no-console
    console.error("errorMiddleware.EEEEE", error);

    let status = 500;
    if (error.name === "ValidationError") {
        status = 400;
    }
    const message = error.message || "Server error";

    response
        .status(status)
        .json({
            message,
            status
        })
        .end();
}

export default errorMiddleware;
