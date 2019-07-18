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
const express = __importStar(require("express"));
const bad_credentials_exception_1 = __importDefault(require("../../../exceptions/bad-credentials.exception"));
const user_exists_exception_1 = __importDefault(require("../../../exceptions/user-exists.exception"));
const errors_1 = __importDefault(require("../../../helpers/errors"));
const validation_middleware_1 = __importDefault(require("../../../middleware/validation.middleware"));
const users_model_1 = __importDefault(require("../../../models/users.model"));
const auth_provider_1 = __importDefault(require("../../../providers/auth.provider"));
const user_provider_1 = __importDefault(require("../../../providers/user.provider"));
const login_dto_1 = __importDefault(require("./login.dto"));
const register_user_dto_1 = __importDefault(require("./register.user.dto"));
class AuthController {
    constructor() {
        this.path = "/auth";
        this.router = express.Router();
        this.user = users_model_1.default;
        this.authProvider = new auth_provider_1.default();
        this.userProvider = new user_provider_1.default();
        this.registration = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = request.body;
                const user = yield this.userProvider.getByEmail(userData.email);
                if (user) {
                    return errors_1.default(new user_exists_exception_1.default(userData.email), response);
                }
                const newUser = yield this.userProvider.create(Object.assign({}, userData));
                // TODO add send hash to email for new user
                newUser.password = undefined;
                response.json(newUser);
            }
            catch (error) {
                return errors_1.default(error, response);
            }
        });
        this.loggingIn = (request, response) => __awaiter(this, void 0, void 0, function* () {
            // TODO move find user to user.provider
            const logInData = request.body;
            const user = yield this.userProvider.getByEmail(logInData.email);
            if (user) {
                const isPasswordMatching = yield this.authProvider.comparePassword(logInData.password, user.password);
                if (isPasswordMatching) {
                    user.password = undefined;
                    const tokenData = this.authProvider.createToken(user);
                    const cookie = this.authProvider.createCookie(tokenData);
                    response.set("Set-Cookie", [cookie]);
                    response.json(user);
                }
                else {
                    return errors_1.default(new bad_credentials_exception_1.default(), response);
                }
            }
            else {
                return errors_1.default(new bad_credentials_exception_1.default(), response);
            }
        });
        this.logout = (request, response) => {
            response.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
            response.send(200);
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, validation_middleware_1.default(register_user_dto_1.default), this.registration);
        this.router.post(`${this.path}/login`, validation_middleware_1.default(login_dto_1.default), this.loggingIn);
        this.router.delete(`${this.path}/logout`, this.logout);
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map