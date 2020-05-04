import config from "@app/config";
import winston from "winston";

class Logger {

    logger: any;

    constructor() {
        this.logger = winston.createLogger({
            level: "info",
            format: winston.format.json(),
            defaultMeta: { service: "cronus-api-service" },
            transports: [
                new winston.transports.File({ filename: config.ERROR_LOG_PATH + "/error.log", level: "error" }),
                new winston.transports.File({ filename: config.APP_LOG_PATH + "/combined.log" }),
            ],
            silent: process.env.NODE_ENV === "testing",
        });

        if (process.env.NODE_ENV !== "production") {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }
    }
}

export default Logger;
