import * as mongoose from "mongoose";
import IPost from "../interfaces/post.interface";

const postSchema = new mongoose.Schema({
    author: {
        ref: "User",
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    content: { type: String },
    title: { type: String }
});

const Posts = mongoose.model<IPost & mongoose.Document>("Post", postSchema);

export default Posts;
