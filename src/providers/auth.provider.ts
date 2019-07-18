import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import IDataStoredInToken from "../interfaces/data-stored-in-token.interface";
import ITokenData from "../interfaces/token-data.interface";
import { IUser } from "../interfaces/user.interface";

export default class AuthProvider {
    public createToken(user: IUser) {
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

    public createCookie(tokenData: ITokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }

    public async comparePassword(inputPassword: string, realPassword: string) {
        const result = await bcrypt.compare(inputPassword, realPassword);
        return result;
    }
}
