import mongoose from "mongoose";
import { IPost } from "../interfaces/post.interface";
import ISearchOptions from "../interfaces/search-options.interface";
import Posts from "../models/posts.model";

export default class PostProvider {
    public posts = Posts;

    public async create(postData: IPost) {
        const newPost = new this.posts({
            ...postData
        });
        const savedPost = await newPost.save();
        await savedPost.populate("author", "-password").execPopulate();

        return savedPost;
    }

    public async list(query: IPost & ISearchOptions) {
        const options: ISearchOptions = {
            limit: 100,
            skip: 0,
            sort:  {
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
        const data: IPost[] = await this.posts.find(
            {},
            {},
            options
        );
        const count: number = await this.posts.countDocuments({});

        return { count, data };
    }

    public async get(id: string) {
        const result: IPost = await this.posts.findById(mongoose.Types.ObjectId(id));

        return result;
    }
}
