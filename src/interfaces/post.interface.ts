interface IPost {
    author: string;
    content: string;
    title: string;
}
interface IPostList {
    data: IPost[];
    count: number;
}

export {
    IPost,
    IPostList
};
