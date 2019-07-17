import express from "express";
import mongoose from "mongoose";
import handleError from "../../../helpers/errors";
import IController from "../../../interfaces/controller.interface";
import IPost from "../../../interfaces/post.interface";
import IRequestWithUser from "../../../interfaces/request-with-user.interface";
import IUser from "../../../interfaces/user.interface";
import authMiddleware from "../../../middleware/auth.middleware";
import validationMiddleware from "../../../middleware/validation.middleware";
import Posts from "../../../models/posts.model";
import CreatePostDto from "./create-post.dto";

class PostsController implements IController {
    public path = "/posts";
    public router = express.Router();
    public posts = Posts;

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(`${this.path}/:_id`, this.get);
        this.router.get(this.path, this.list);
        this.router.post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.create);
    }

    private create = async (req: IRequestWithUser, response: express.Response) => {
        try {
            const postData: CreatePostDto = req.body;
            const newPost = new this.posts({
                ...postData,
                author: req.user._id
            });
            const savedPost = await newPost.save();
            await savedPost.populate("author", "-password").execPopulate();

            return response.json(savedPost);
        } catch (error) {
            return handleError(error, response);
        }
    }

    private list = async (request: express.Request, response: express.Response) => {
        try {
            const data: IPost[] = await this.posts.find({});
            const count: number = await this.posts.countDocuments({});

            return response.json({ count, data });
        } catch (error) {
            return handleError(error, response);
        }
    }

    private get = async (req: express.Request, response: express.Response) => {
        try {
            const id = mongoose.Types.ObjectId(req.params._id);
            const result: IPost = await this.posts.findById(id);
            if (!result) {
                return response.status(404).json({ message: "Not found" });
            }

            return response.json(result);
        } catch (error) {
            return handleError(error, response);
        }
    }

}

export default PostsController;
