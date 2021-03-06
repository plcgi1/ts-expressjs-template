"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
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
exports.default = errorMiddleware;
//# sourceMappingURL=error.js.map