interface IUser {
    name: string;
    email: string;
    password: string;
    _id?: string;
}
interface IUserList {
    data: IUser;
    count: number;
}
export { IUser, IUserList };
