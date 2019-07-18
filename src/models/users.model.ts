import * as mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String },
    password: { type: String, required: true }
});

const Users = mongoose.model<IUser & mongoose.Document>("User", UserSchema);

export default Users;
