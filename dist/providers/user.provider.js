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
const bcrypt = __importStar(require("bcrypt"));
const pagination_1 = __importDefault(require("../helpers/pagination"));
const users_model_1 = __importDefault(require("../models/users.model"));
class UserProvider {
    constructor() {
        this.user = users_model_1.default;
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            userData.password = yield bcrypt.hash(userData.password, 10);
            const newUser = yield this.user.create(Object.assign({}, userData));
            return newUser;
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.user.findOne({ email });
            return user;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.user.findById(id);
                return user;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    list(query, pagerOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = pagination_1.default(pagerOptions);
            const data = yield this.user.find(query, {}, options);
            const count = yield this.user.countDocuments(query);
            return { data, count };
        });
    }
}
exports.default = UserProvider;
//# sourceMappingURL=user.provider.js.map