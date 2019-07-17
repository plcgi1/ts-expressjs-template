import "dotenv/config";
import App from "./app";
import validateEnv from "./helpers/validate-env";

import PostsController from "./controllers/api/posts/post.controller";

validateEnv();

const app = new App(
    [
        new PostsController(),
    ]
);

app.listen();
