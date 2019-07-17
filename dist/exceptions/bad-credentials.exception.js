"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = __importDefault(require("./http.exception"));
class BadCredentialsException extends http_exception_1.default {
    constructor() {
        super(401, "Wrong credentials provided");
    }
}
exports.default = BadCredentialsException;
//# sourceMappingURL=bad-credentials.exception.js.map