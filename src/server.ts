import "dotenv/config";
import App from "./app";
import validateEnv from "./helpers/validate-env";

import AuthController from "./controllers/api/auth/auth.controller";
import PostsController from "./controllers/api/posts/post.controller";

validateEnv();

const app = new App(
    [
        new PostsController(),
        new AuthController()
    ]
);

app.listen();
