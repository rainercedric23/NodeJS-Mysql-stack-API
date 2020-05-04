import Logger from "@app/logger";

class Service {

    static rejectResponse(error, code = 500) {
        Service.logError(error);
        return { error, code };
    }

    static successResponse(payload, code = 200) {
        return { payload, code };
    }

    static logInfo(value) {
        const log = new Logger();

        if (typeof value === "object" && value !== null) {
            return log.logger.info(value.toString());
        }

        return log.logger.info(value);
    }

    static logError(value) {
        const log = new Logger();

        if (typeof value === "object" && value !== null) {
            return log.logger.error(value.toString());
        }

        return log.logger.error(value);
    }
}

export default Service;
