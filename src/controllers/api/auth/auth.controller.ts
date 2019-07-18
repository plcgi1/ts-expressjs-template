import * as express from "express";
import BadCredentialsException from "../../../exceptions/bad-credentials.exception";
import UserExistsException from "../../../exceptions/user-exists.exception";
import handleError from "../../../helpers/errors";
import IController from "../../../interfaces/controller.interface";
import validationMiddleware from "../../../middleware/validation.middleware";
import Users from "../../../models/users.model";
import AuthProvider from "../../../providers/auth.provider";
import UserProvider from "../../../providers/user.provider";
import LoginDto from "./login.dto";
import RegisterUserDto from "./register.user.dto";

class AuthController implements IController {
    public path = "/auth";
    public router = express.Router();
    private user = Users;
    private authProvider = new AuthProvider();
    private userProvider = new UserProvider();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, validationMiddleware(RegisterUserDto), this.registration);
        this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.loggingIn);
        this.router.delete(`${this.path}/logout`, this.logout);
    }

    private registration = async (request: express.Request, response: express.Response) => {
        try {
            const userData: RegisterUserDto = request.body;
            const user = await this.userProvider.getByEmail( userData.email );
            if (user) {
                return handleError(new UserExistsException(userData.email), response);
            }

            const newUser = await this.userProvider.create({
                ...userData
            });
            // TODO add send hash to email for new user
            newUser.password = undefined;
            response.json(newUser);
        } catch (error) {
            return handleError(error, response);
        }
    }

    private loggingIn = async (request: express.Request, response: express.Response) => {
        // TODO move find user to user.provider
        const logInData: LoginDto = request.body;
        const user = await this.user.findOne({ email: logInData.email });
        if (user) {
            const isPasswordMatching = await this.authProvider.comparePassword(logInData.password, user.password);
            if (isPasswordMatching) {
                user.password = undefined;

                const tokenData = this.authProvider.createToken(user);
                const cookie = this.authProvider.createCookie(tokenData);

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
