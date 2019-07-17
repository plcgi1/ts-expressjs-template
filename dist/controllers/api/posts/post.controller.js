"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_exception_1 = __importDefault(require("../../../exceptions/http.exception"));
const posts_model_1 = __importDefault(require("../../../models/posts.model"));
class PostsController {
    constructor() {
        this.path = "/posts";
        this.router = express_1.default.Router();
        this.posts = posts_model_1.default;
        this.list = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.posts.find({});
                return response.json(data);
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.create = (req, response, next) => __awaiter(this, void 0, void 0, function* () {
            const postData = req.body;
            try {
                const post = new this.posts(postData);
                const result = yield post.save();
                return response.json(result);
            }
            catch (error) {
                // return response.status(500).json({ msg: error.message });
                return next(error);
            }
        });
        this.get = (req, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = mongoose_1.default.Types.ObjectId(req.params._id);
                const result = yield this.posts.findById(id);
                if (!result) {
                    return response.status(404).json({ msg: "Mot found" });
                }
                return response.json(result);
            }
            catch (error) {
                // throw new Error(error);
                // tslint:disable-next-line:no-console
                console.error("error", error);
                throw new http_exception_1.default(500, error);
                // return response.status(500).json({ msg: "Server error" });
            }
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(`${this.path}/:_id`, this.get);
        this.router.get(this.path, this.list);
        this.router.post(this.path, this.create);
    }
}
exports.default = PostsController;
//# sourceMappingURL=post.controller.js.map