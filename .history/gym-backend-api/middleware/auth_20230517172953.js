// import { query } from "express"
import models from "../models/model.js"

export default function auth(allowed_roles) {
    return function (req, res, next) {
        const authenticationKey = req.body.authenticationKey ?? req.query.authKey
        console.log(query)
        console.log(authenticationKey)

        if (authenticationKey) {
            models.userModel.getByAuthenticationKey(authenticationKey)
                .then(user => {

                    if (allowed_roles.includes(user.role)) {
                        next()
                    } else {
                        res.status(403).json({
                            status: 403,
                            message: "Access forbidden"
                        })
                    }
                })
                .catch(error => {
                    res.status(401).json({
                        status: 401,
                        message: "Authentication key invalid or expired" + error
                    })
                })
        } else {
            res.status(401).json({
                status: 401,
                message: "Authentication key missing from request"
            })
        }

    }
}