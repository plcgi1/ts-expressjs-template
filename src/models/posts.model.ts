import * as mongoose from "mongoose";
import IPost from "./post.interface";

const postSchema = new mongoose.Schema({
    author: { type: String, required: true },
    content: String,
    title: String,
});

const Posts = mongoose.model<IPost & mongoose.Document>("Post", postSchema);

export default Posts;
