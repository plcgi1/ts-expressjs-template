"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = __importDefault(require("./http.exception"));
class UserExistsException extends http_exception_1.default {
    constructor(email) {
        super(400, `User with email ${email} already exists`);
    }
}
exports.default = UserExistsException;
//# sourceMappingURL=user-exists.exception.js.map