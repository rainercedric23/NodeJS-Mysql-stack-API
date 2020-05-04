import path from "path";

const config = {
    ROOT_DIR: __dirname,
    URL_PORT: 3000,
    URL_PATH: "http://localhost",
    BASE_VERSION: "v1",
    CONTROLLER_DIRECTORY: path.join(__dirname, "controllers"),
    OPENAPI_YAML: "",
    FULL_PATH: "",
    ERROR_LOG_PATH: process.env.ERROR_LOG_PATH || "logs",
    APP_LOG_PATH: process.env.APP_LOG_PATH || "logs",
    HASH_SECRET: "thisisasecret1",
    JWT_SECRET: "thisisasecret2",
    MYSQL_HOST: process.env.MYSQL_HOST || "localhost",
    MYSQL_USER: process.env.MYSQL_USER || "root",
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || "cronus",
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "password",
    MYSQL_PORT: process.env.MYSQL_PORT || "3306",
};

config.OPENAPI_YAML = path.join(config.ROOT_DIR, "../schema", "openapi.yaml");
config.FULL_PATH = `${config.URL_PATH}:${config.URL_PORT}/${config.BASE_VERSION}`;

export default config;
