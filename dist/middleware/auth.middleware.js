"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const auth_token_missing_exception_1 = __importDefault(require("../exceptions/auth.token.missing.exception"));
const wrong_auth_token_exception_1 = __importDefault(require("../exceptions/wrong-auth-token.exception"));
const errors_1 = __importDefault(require("../helpers/errors"));
const users_model_1 = __importDefault(require("../models/users.model"));
function authMiddleware(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const cookies = request.cookies;
        if (cookies && cookies.Authorization) {
            const secret = process.env.JWT_SECRET;
            try {
                const verificationResponse = jwt.verify(cookies.Authorization, secret);
                const id = verificationResponse._id;
                const user = yield users_model_1.default.findById(id);
                if (user) {
                    request.user = user;
                    next();
                }
                else {
                    return errors_1.default(new wrong_auth_token_exception_1.default(), response);
                }
            }
            catch (error) {
                return errors_1.default(new wrong_auth_token_exception_1.default(), response);
            }
        }
        else {
            return errors_1.default(new auth_token_missing_exception_1.default(), response);
        }
    });
}
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map