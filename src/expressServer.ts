// const { Middleware } = require("swagger-express-middleware");
import path from "path";
import swaggerUI from "swagger-ui-express";
import yamljs from "yamljs";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authMiddleware from "@middlewares/AuthMiddleware";
import bodyParser from "body-parser";
import { OpenApiValidator } from "express-openapi-validator";
import OpenApiRouter from "./utils/openapiRouter";
import Logger from "@app/logger";
import "@app/database";

class ExpressServer {
    port: any;
    app: any;
    openApiPath: any;
    schema: any;
    server: any;
    winston: Logger;

    constructor(port, openApiYaml) {
        this.winston = new Logger();
        this.port = port;
        this.app = express();
        this.openApiPath = openApiYaml;
        this.schema = yamljs.load(openApiYaml);
        this.setupMiddleware();
    }

    setupMiddleware() {
        // this.setupAllowedMedia();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(authMiddleware());
        this.app.use("/spec", express.static(path.join(__dirname, "schema")));
        this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(this.schema));
        // open api validator base on the yaml in schema directory
        new OpenApiValidator({
            apiSpecPath: this.openApiPath,
        }).install(this.app);
        this.app.use(new OpenApiRouter().openapiRouter());
        this.app.get("/", (req, res) => {
            res.status(200);
            res.end("This is Cronus API, refer to /api-docs for the list of methods available");
        });
    }

    addErrorHandler() {
        this.app.use("*", (req, res) => {
            res.status(404);
            res.send(JSON.stringify({ error: `path ${req.baseUrl} doesn't exist` }));
        });
        /**
         * suppressed eslint rule: The next variable is required here, even though it's not used.
         *
         */
        // eslint-disable-next-line no-unused-vars
        this.app.use((error, req, res, next) => {
            const errorResponse = error.error || error.errors || error.message || "Unknown error";
            res.status(error.status || 500);
            res.type("json");
            res.json({ error: errorResponse });
        });
    }

    async launch() {
        return new Promise(
            async (resolve, reject) => {
                try {
                    this.addErrorHandler();
                    this.server = await this.app.listen(this.port, () => {
                        this.winston.logger.info(`server running on port ${this.port}`);
                        resolve(this.server);
                    });
                } catch (error) {
                    reject(error);
                }
            },
        );
    }

    async close() {
        if (this.server !== undefined) {
            await this.server.close();
            this.winston.logger.info(`Server on port ${this.port} shut down`);
        }
    }
}

export default ExpressServer;
