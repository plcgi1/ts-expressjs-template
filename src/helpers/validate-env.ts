import {
    cleanEnv, port, str
} from "envalid";

export default function validateEnv() {
    cleanEnv(process.env, {
        JWT_SECRET: str(),
        MONGO_HOST: str(),
        MONGO_PASSWORD: str(),
        MONGO_PORT: port(),
        MONGO_USER: str(),
        PORT: port(),
    });
}
