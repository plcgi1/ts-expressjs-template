"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        // tslint:disable-next-line:no-console
        console.info("YTHTHI", this);
        if (this.name === "ValidationError") {
            status = 400;
        }
        this.status = status;
        this.message = message;
    }
}
exports.default = HttpException;
//# sourceMappingURL=http.exception.js.map