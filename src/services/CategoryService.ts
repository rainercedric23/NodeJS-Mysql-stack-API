/* eslint-disable no-unused-vars */
import Service from "@services/Service";
import Logger from "@app/logger";
import jwt from "jsonwebtoken";
import config from "@app/config";
import connection from "@app/database";

class CategoryService {

    /**
     * Create Service
     */
    static createCategory(params) {
        return new Promise(
            async (resolve) => {
                try {
                    resolve(Service.successResponse(
                        {},
                        200,
                    ));
                } catch (e) {
                    resolve(Service.rejectResponse(
                        e.message || "Invalid input",
                        e.status || 403,
                    ));
                }
            },
        );
    }

    /**
     * Update Service
     */
    static updateCategory(params) {
        return new Promise(
            async (resolve) => {
                try {
                    const response = jwt.verify(params.body.token, config.JWT_SECRET);

                    resolve(Service.successResponse(
                        response,
                        200,
                    ));
                } catch (e) {
                    resolve(Service.rejectResponse(
                        e.message || "Invalid input",
                        e.status || 403,
                    ));
                }
            },
        );
    }

    /**
     * Delete Service
     */
    static deleteCategory(params) {
        return new Promise(
            async (resolve) => {
                try {
                    const response = jwt.verify(params.body.token, config.JWT_SECRET);

                    resolve(Service.successResponse(
                        response,
                        200,
                    ));
                } catch (e) {
                    resolve(Service.rejectResponse(
                        e.message || "Invalid input",
                        e.status || 403,
                    ));
                }
            },
        );
    }

    /**
     * Get Service
     */
    static getCategory(params) {
        return new Promise(
            async (resolve) => {
                try {
                    const response = jwt.verify(params.body.token, config.JWT_SECRET);

                    resolve(Service.successResponse(
                        response,
                        200,
                    ));
                } catch (e) {
                    resolve(Service.rejectResponse(
                        e.message || "Invalid input",
                        e.status || 403,
                    ));
                }
            },
        );
    }
}

export default CategoryService;
