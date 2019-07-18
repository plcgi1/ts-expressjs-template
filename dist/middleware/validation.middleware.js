"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const http_exception_1 = __importDefault(require("../exceptions/http.exception"));
const errors_1 = __importDefault(require("../helpers/errors"));
function validationMiddleware(type, skipMissingProperties = false) {
    return (req, res, next) => {
        const param = (/post|put|patch/i).test(req.method) ? req.body : req.query;
        Object.keys(param).forEach((key) => {
            if ((/^\d+$/).test(param[key])) {
                param[key] = parseInt(param[key], 10);
            }
        });
        class_validator_1.validate(class_transformer_1.plainToClass(type, param), { skipMissingProperties })
            .then((errors) => {
            if (errors.length > 0) {
                const message = errors.map((error) => Object.values(error.constraints)).join(", ");
                return errors_1.default(new http_exception_1.default(400, message), res);
            }
            else {
                next();
            }
        });
    };
}
exports.default = validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map