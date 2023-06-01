

export default function auth(allowed_roles) {
    return function (req, res, next) {
        // Get the authentication key from the request body
        const authenticationKey = req.body.authenticationKey

        // Check that an auth key was actually included in the body
        if (authenticationKey) {
            // Look up the user by the auth key
            models.userModel.getByAuthenticationKey(authenticationKey)
                .then(user => {
                    // If the matching user has the required role
                    if (allowed_roles.includes(user.role)) {
                        // Allow them to pass (next())
                        next()
                    } else {
                        // Send back an access forbidden response
                        res.status(403).json({
                            status: 403,
                            message: "Access forbidden"
                        })
                    }
                })
                .catch(error => {
                    // No user found - invalid or expired key?
                    res.status(401).json({
                        status: 401,
                        message: "Authentication key invalid or expired"
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