"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const postSchema = new mongoose.Schema({
    author: {
        ref: "User",
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    content: { type: String },
    title: { type: String }
});
const Posts = mongoose.model("Post", postSchema);
exports.default = Posts;
//# sourceMappingURL=posts.model.js.map