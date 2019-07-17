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
const errors_1 = __importDefault(require("../../../helpers/errors"));
const auth_middleware_1 = __importDefault(require("../../../middleware/auth.middleware"));
const validation_middleware_1 = __importDefault(require("../../../middleware/validation.middleware"));
const posts_model_1 = __importDefault(require("../../../models/posts.model"));
const create_post_dto_1 = __importDefault(require("./create-post.dto"));
class PostsController {
    constructor() {
        this.path = "/posts";
        this.router = express_1.default.Router();
        this.posts = posts_model_1.default;
        this.create = (req, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const postData = req.body;
                const newPost = new this.posts(Object.assign({}, postData, { author: req.user._id }));
                const savedPost = yield newPost.save();
                yield savedPost.populate("author", "-password").execPopulate();
                return response.json(savedPost);
            }
            catch (error) {
                return errors_1.default(error, response);
            }
        });
        this.list = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.posts.find({});
                const count = yield this.posts.countDocuments({});
                return response.json({ count, data });
            }
            catch (error) {
                return errors_1.default(error, response);
            }
        });
        this.get = (req, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = mongoose_1.default.Types.ObjectId(req.params._id);
                const result = yield this.posts.findById(id);
                if (!result) {
                    return response.status(404).json({ message: "Not found" });
                }
                return response.json(result);
            }
            catch (error) {
                return errors_1.default(error, response);
            }
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(`${this.path}/:_id`, this.get);
        this.router.get(this.path, this.list);
        this.router.post(this.path, auth_middleware_1.default, validation_middleware_1.default(create_post_dto_1.default), this.create);
    }
}
exports.default = PostsController;
//# sourceMappingURL=post.controller.js.map