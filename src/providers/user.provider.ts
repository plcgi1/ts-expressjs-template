import * as bcrypt from "bcrypt";
import { IUser } from "../interfaces/user.interface";
import Users from "../models/users.model";

export default class UserProvider {
    private user = Users;

    public async create(userData: IUser) {
        userData.password = await bcrypt.hash(userData.password, 10);

        const newUser = await this.user.create({
            ...userData
        });

        return newUser;
    }

    public async getByEmail(email: string) {
        const user = await this.user.findOne({ email });
        return user;
    }
}
