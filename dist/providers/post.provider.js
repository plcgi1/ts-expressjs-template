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
const mongoose_1 = __importDefault(require("mongoose"));
const posts_model_1 = __importDefault(require("../models/posts.model"));
class PostProvider {
    constructor() {
        this.posts = posts_model_1.default;
    }
    create(postData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = new this.posts(Object.assign({}, postData));
            const savedPost = yield newPost.save();
            yield savedPost.populate("author", "-password").execPopulate();
            return savedPost;
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                limit: 100,
                skip: 0,
                sort: {
                    dateCreated: query.sorder ? parseInt(query.sorder, 10) : -1
                }
            };
            if (query.sortby) {
                options.sort[query.sortby] = options.sort[query.sortby];
            }
            if (query.limit) {
                options.limit = query.limit;
            }
            if (query.skip) {
                options.skip = query.skip;
            }
            const data = yield this.posts.find({}, {}, options);
            const count = yield this.posts.countDocuments({});
            return { count, data };
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.posts.findById(mongoose_1.default.Types.ObjectId(id));
            return result;
        });
    }
}
exports.default = PostProvider;
//# sourceMappingURL=post.provider.js.map