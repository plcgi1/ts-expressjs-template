import * as bcrypt from "bcrypt";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import BadCredentialsException from "../../../exceptions/bad-credentials.exception";
import UserExistsException from "../../../exceptions/user-exists.exception";
import handleError from "../../../helpers/errors";
import IController from "../../../interfaces/controller.interface";
import IDataStoredInToken from "../../../interfaces/data-stored-in-token.interface";
import ITokenData from "../../../interfaces/token-data.interface";
import IUser from "../../../interfaces/user.interface";
import validationMiddleware from "../../../middleware/validation.middleware";
import Users from "../../../models/users.model";
import LoginDto from "./login.dto";
import RegisterUserDto from "./register.user.dto";

class AuthController implements IController {
    public path = "/auth";
    public router = express.Router();
    private user = Users;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, validationMiddleware(RegisterUserDto), this.registration);
        this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.loggingIn);
        this.router.delete(`${this.path}/logout`, this.logout);
    }

    private createToken(user: IUser) {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken: IDataStoredInToken = {
            _id: user._id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }

    private createCookie(tokenData: ITokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }

    private registration = async (request: express.Request, response: express.Response) => {
        try {
            const userData: RegisterUserDto = request.body;
            const user = await this.user.findOne({ email: userData.email });
            if (user) {
                return handleError(new UserExistsException(userData.email), response);
            }
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const newUser = await this.user.create({
                ...userData,
                password: hashedPassword,
            });
            newUser.password = undefined;
            response.json(newUser);
        } catch (error) {
            return handleError(error, response);
        }
    }

    private loggingIn = async (request: express.Request, response: express.Response) => {
        const logInData: LoginDto = request.body;
        const user = await this.user.findOne({ email: logInData.email });
        if (user) {
            const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
            if (isPasswordMatching) {
                user.password = undefined;

                const tokenData = this.createToken(user);
                const cookie = this.createCookie(tokenData);

                response.set("Set-Cookie", [cookie]);

                response.send(user);
            } else {
                return handleError(new BadCredentialsException(), response);
            }
        } else {
            return handleError(new BadCredentialsException(), response);
        }
    }

    private logout = (request: express.Request, response: express.Response) => {
        response.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
        response.send(200);
    }
}

export default AuthController;
