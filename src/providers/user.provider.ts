import * as bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import pagination from "../helpers/pagination";
import ISearchOptions from "../interfaces/search-options.interface";
import { IUser, IUserList } from "../interfaces/user.interface";
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

    public async getById(id: string) {
        try {
            const user = await this.user.findById(id);

            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async list(query: IUser, pagerOptions: ISearchOptions) {
        const options = pagination(pagerOptions);
        const data = await this.user.find(query, {}, options);
        const count = await this.user.countDocuments(query);

        return { data, count };
    }
}
