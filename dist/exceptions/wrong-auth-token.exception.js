"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = __importDefault(require("./http.exception"));
class WrongAuthenticationTokenException extends http_exception_1.default {
    constructor() {
        super(401, "Wrong authentication token");
    }
}
exports.default = WrongAuthenticationTokenException;
//# sourceMappingURL=wrong-auth-token.exception.js.map