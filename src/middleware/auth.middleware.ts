import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import AuthenticationTokenMissingException from "../exceptions/auth.token.missing.exception";
import WrongAuthenticationTokenException from "../exceptions/wrong-auth-token.exception";
import handleError from "../helpers/errors";
import IDataStoredInToken from "../interfaces/data-stored-in-token.interface";
import IRequestWithUser from "../interfaces/request-with-user.interface";
import UserProvider from "../providers/user.provider";

async function authMiddleware(request: IRequestWithUser, response: Response, next: NextFunction) {
    const cookies = request.cookies;

    if (cookies && cookies.Authorization) {
        const secret = process.env.JWT_SECRET;
        try {
            const verificationResponse = jwt.verify(cookies.Authorization, secret) as IDataStoredInToken;
            const id = verificationResponse._id;
            const provider = new UserProvider();

            const user = await provider.getById(id);
            if (user) {
                request.user = user;
                next();
            } else {
                return handleError(new WrongAuthenticationTokenException(), response);
            }
        } catch (error) {
            return handleError(new WrongAuthenticationTokenException(), response);
        }
    } else {
        return handleError(new AuthenticationTokenMissingException(), response);
    }
}

export default authMiddleware;
