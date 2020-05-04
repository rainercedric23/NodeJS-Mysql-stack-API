/* eslint-disable no-unused-vars */
import Service from "@services/Service";
import Logger from "@app/logger";
import uuid from "uuid/v4";
import connection from "@app/database";
import bcrypt from "bcryptjs";

class UserService {

    /**
     * Get Player Details
     * Returns the Player Details
     */
    static getUserDetails(params) {
        return new Promise(
            async (resolve) => {
                try {
                    const id = params.id || null;
                    const email = params.email || null;
                    const role = params.role || null;
                    // create initial query
                    let query = "SELECT * FROM users ";
                    let queryWhere = "";
                    const arrayWhere = [];

                    if (id) {
                        queryWhere += "id = ? ";
                        arrayWhere.push(id);
                    }

                    if (email) {
                        if (queryWhere) {
                            queryWhere += "AND email = ? ";
                        } else {
                            queryWhere += "email = ? ";
                        }

                        arrayWhere.push(email);
                    }

                    if (role) {
                        if (queryWhere) {
                            queryWhere += "AND role = ? ";
                        } else {
                            queryWhere += "role = ? ";
                        }

                        arrayWhere.push(role);
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

    /**
     * Create User
     * Returns a successful response after user has been created
     */
    static createUser(params) {
        return new Promise(
            async (resolve) => {
                try {
                    const paramsBody = [
                        params.body.email,
                        bcrypt.hashSync(params.body.password, 8),
                        params.body.firstName,
                        params.body.lastName,
                        params.body.role,
                        new Date().toISOString().slice(0, 19).replace("T", " "),
                        new Date().toISOString().slice(0, 19).replace("T", " "),
                        params.body.status,
                    ];
                    connection.query(
                    "INSERT INTO users (email, password, first_name, last_name, role, modified, created, status) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    paramsBody,
                    (error, results, fields) => {
                        if (error) {
                            resolve(Service.rejectResponse(
                                error.sqlMessage,
                                400,
                            ));
                        }

                        resolve(Service.successResponse(
                            {message: "Successfully created User"},
                            200,
                        ));
                    });
                } catch (e) {
                    resolve(Service.rejectResponse(
                        e.message || "Invalid input",
                        e.status || 405,
                    ));
                }
            },
        );
    }

    /**
     * Reset Password base on token passed from the request body
     * Returns a successful response after user password has been changed
     */
    static resetPassword(params) {
        return new Promise(
            async (resolve) => {
                try {
                    const resetToken = params.body.token;
                    const password = bcrypt.hashSync(params.body.password, 8);
                    // set password
                    connection.query(
                        "UPDATE users SET password = ? WHERE activation_key = ?",
                        [password, resetToken],
                        (error, results, fields) => {
                            if (results.changedRows === 0) {
                                resolve(Service.rejectResponse(
                                    {message: "failed, Invalid or expired token"},
                                    400,
                                ));
                            }
                            // empty out activation key so it won't be reused anymore
                            connection.query(
                                "UPDATE users SET activation_key = ? WHERE activation_key = ?",
                                [null, resetToken],
                            );

                            resolve(Service.successResponse(
                                {message: "success"},
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

    /**
     * Request Activation Key for Forgot Password
     * Returns a token parameter to be use on reset password
     */
    static resetToken(params) {
        return new Promise(
            async (resolve) => {
                try {
                    const resetToken = uuid();
                    const userEmail = params.body.email;

                    connection.query(
                        "UPDATE users SET activation_key = ? WHERE email = ?",
                        [resetToken, userEmail],
                        (error, results, fields) => {
                            if (error) {
                                resolve(Service.rejectResponse(
                                    error.sqlMessage || "Invalid input",
                                    400,
                                ));
                            }

                            resolve(Service.successResponse(
                                {token: resetToken},
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

    /**
     * Update User base on parameters given
     * returns a sucessful response if user was successfully edited
     */
    static updateUser(params) {
        return new Promise(
            async (resolve) => {
                try {
                    const query = "UPDATE users SET first_name = ?, last_name = ?, role = ?, " +
                    "status = ? WHERE id = ?";
                    const arrayValues = [
                        params.body.firstName,
                        params.body.lastName,
                        params.body.role,
                        params.body.status,
                        params.body.id,
                    ];

                    connection.query(
                        query,
                        arrayValues,
                        (error, results, fields) => {
                            if (error) {
                                resolve(Service.rejectResponse(
                                    error.sqlMessage || "Invalid input",
                                    400,
                                ));
                            }

                            resolve(Service.successResponse(
                                {message: "User successfully updated"},
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

export default UserService;
