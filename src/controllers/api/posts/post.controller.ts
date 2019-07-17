import express from "express";
import mongoose from "mongoose";
import HttpException from "../../../exceptions/http.exception";
import IPost from "../../../models/post.interface";
import Posts from "../../../models/posts.model";
import IController from "../../controller.interface";

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
        this.router.post(this.path, this.create);
    }

    private list = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            const data: IPost[] = await this.posts.find({});

            return response.json(data);
        } catch (error) {
            return next(error);
        }
    }

    private create = async (req: express.Request, response: express.Response, next: express.NextFunction) => {
        const postData = req.body;
        try {
            const post = new this.posts(postData);
            const result: IPost = await post.save();

            return response.json(result);
        } catch (error) {
            return next(error);
        }
    }

    private get = async (req: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            const id = mongoose.Types.ObjectId(req.params._id);
            const result: IPost = await this.posts.findById(id);
            if (!result) {
                return response.status(404).json({ msg: "Mot found" });
            }

            return response.json(result);
        } catch (error) {
            return next(error);
        }
    }

}

export default PostsController;
