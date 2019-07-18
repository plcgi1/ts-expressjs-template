import express from "express";
import handleError from "../../../helpers/errors";
import IController from "../../../interfaces/controller.interface";
import { IPost, IPostList } from "../../../interfaces/post.interface";
import IRequestWithUser from "../../../interfaces/request-with-user.interface";
import authMiddleware from "../../../middleware/auth.middleware";
import validationMiddleware from "../../../middleware/validation.middleware";
import PostProvider from "../../../providers/post.provider";
import SearchParamsDto from "../../../validators/search-params.dto";
import CreatePostDto from "./create-post.dto";

class PostsController implements IController {
    public path = "/posts";
    public router = express.Router();
    public postProvider = new PostProvider();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(`${this.path}/:_id`, this.get);
        this.router.get(this.path, validationMiddleware(SearchParamsDto), this.list);
        this.router.post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.create);
    }

    private create = async (req: IRequestWithUser, response: express.Response) => {
        try {
            const postData: CreatePostDto = req.body;

            const savedPost = await this.postProvider.create({
                ...postData,
                author: req.user._id
            });
            return response.json(savedPost);
        } catch (error) {
            return handleError(error, response);
        }
    }

    private list = async (request: express.Request, response: express.Response) => {
        try {
            const result: IPostList = await this.postProvider.list(request.query);

            return response.json(result);
        } catch (error) {
            return handleError(error, response);
        }
    }

    private get = async (req: express.Request, response: express.Response) => {
        try {
            const result: IPost = await this.postProvider.get(req.params._id);
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
