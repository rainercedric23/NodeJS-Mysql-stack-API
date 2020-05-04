import Logger from "@app/logger";
import config from "@app/config";
import jwt from "jsonwebtoken";

function AuthMiddleware() {
    return (req, res, next) => {
        const winston = new Logger();
        winston.logger.info("AuthMiddleware request method: " + req.method + " request path: " + req.path);

        if (req.path.indexOf("service") !== -1) {
            authorizeService(req, res);
        }

        // Set header to authorized to true after all authorization checking
        res.setHeader("X-Authorized", true);
        next();
    };

    /**
     * Method helper to send response object
     */
    function unauthorize(res) {
        res.setHeader("x-authorized", false);
        return { message: "Unauthorized User", code: 403 };
    }

    /**
     * Method to authorize service module
     */
    function authorizeService(req, res) {
        const jwtValue = jwt.verify(req.headers.token, config.JWT_SECRET);

        if (jwtValue.userObj.role === "admin") {
            return true;
        }

        res.json(unauthorize(res));
    }
}

export default AuthMiddleware;
