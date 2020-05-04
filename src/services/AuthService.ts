/* eslint-disable no-unused-vars */
import Service from "@services/Service";
import Logger from "@app/logger";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "@app/config";
import connection from "@app/database";

class AuthService {
    /**
     * Login User base on credentials
     */
    static loginUser(params) {
        return new Promise(
            async (resolve) => {
                try {
                    const userEmail = params.body.email;
                    const password = params.body.password;

                    connection.query(
                        "SELECT * FROM users WHERE email = ?",
                        [userEmail, password],
                        (error, results, fields) => {
                            if (error || results.length === 0) {
                                resolve(Service.rejectResponse(
                                    {message: "Fail Login"},
                                    403,
                                ));
                                return;
                            }

                            // compare password on DB result
                            const compare = bcrypt.compareSync(params.body.password, results[0].password);

                            if (!compare) {
                                resolve(Service.rejectResponse(
                                    {message: "Fail Login"},
                                    403,
                                ));
                            }

                            const userObj = {
                                userId: results[0].id,
                                email: results[0].email,
                                created: results[0].created,
                                modified: results[0].modified,
                                status: results[0].status,
                                role: results[0].role,
                            };

                            resolve(Service.successResponse({
                                    userObj,
                                    token: jwt.sign({
                                        userObj,
                                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // expire 1 day
                                    }, config.JWT_SECRET),
                                },
                                200,
                            ));
                        },
                    );
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
     * Verify JWT Token and return its values
     */
    static verifyToken(params) {
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

export default AuthService;
