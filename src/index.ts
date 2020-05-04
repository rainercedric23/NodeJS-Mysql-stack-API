import "module-alias/register";

import config from "@app/config";
import Logger from "@app/logger";
import ExpressServer from "@app/expressServer";

class AppLauncher {

    expressServer: ExpressServer;
    winston: Logger;

    constructor() {
        this.winston = new Logger();
        this.launchServer().catch((e) => { this.winston.logger.error(e); });
    }

    async launchServer() {
        try {
            this.expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
            await this.expressServer.launch();
            this.winston.logger.info("Express server running");
        } catch (error) {
            this.winston.logger.error(error);
            await this.expressServer.close();
        }
    }
}

const app = new AppLauncher();
