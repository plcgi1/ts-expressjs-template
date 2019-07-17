"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleError(err, response) {
    // TODO add errors []
    // TODO add logger
    const res = { message: err.message };
    // tslint:disable-next-line:no-console
    console.error("ERROR", err);
    return response.status(err.status).json(res).end();
}
exports.default = handleError;
//# sourceMappingURL=errors.js.map