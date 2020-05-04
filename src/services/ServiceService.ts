/* eslint-disable no-unused-vars */
import Service from "@services/Service";
import Logger from "@app/logger";
import jwt from "jsonwebtoken";
import config from "@app/config";
import connection from "@app/database";

class ServiceService {

    /**
     * Create Service
     */
    static createService(params) {
        return new Promise(
            async (resolve) => {
                try {
                    resolve(Service.successResponse(
                        {something: "something"},
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
    static updateService(params) {
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
     * Delete Service
     */
    static deleteService(params) {
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
    static getService(params) {
        return new Promise(
            async (resolve) => {
                 try {
                    const id = params.id || null;
                    const clientId = params.clientId || null;
                    const categoryId = params.categoryId || null;

                    // create initial query
                    let query = "SELECT * FROM services LEFT JOIN clients " +
                        "ON services.client_id  = clients.id " +
                        "LEFT JOIN categories ON services.category_id = categories.id ";
                    let queryWhere = "";
                    const arrayWhere = [];

                    if (id) {
                        queryWhere += "id = ? ";
                        arrayWhere.push(id);
                    }

                    if (clientId) {
                        if (queryWhere) {
                            queryWhere += "AND client_id = ? ";
                        } else {
                            queryWhere += "client_id = ? ";
                        }

                        arrayWhere.push(clientId);
                    }

                    if (categoryId) {
                        if (queryWhere) {
                            queryWhere += "AND category_id = ? ";
                        } else {
                            queryWhere += "category_id = ? ";
                        }

                        arrayWhere.push(categoryId);
                    }

                    if (queryWhere) {
                        query += "WHERE " + queryWhere;
                    }

                    // Run the created query
                    connection.query(query, arrayWhere,
                        (error, results, fields) => {
                            if (error) {
                                resolve(Service.rejectResponse(
                                    error.sqlMessage,
                                    400,
                                ));
                            }

                            resolve(Service.successResponse(
                                results,
                                200,
                            ));
                        },
                    );
                } catch (e) {
                    resolve(Service.rejectResponse(
                        e.message || "Invalid input",
                        e.status || 405,
                    ));
                }
            },
        );
    }
}

export default ServiceService;
