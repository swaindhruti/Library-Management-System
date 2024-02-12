// Middleware for handling the library user authentication

const { User } = require("../db/models")

function userAuthentication(req, res, next) {
    // Extract credentials from request headers
    const username = req.headers.username;
    const password = req.headers.password;

    // Attempt to find matching user record in database
    User.findOne({
        username: username,
        password: password
    })

    .then(function (value) {
        if (value) {
            // Admin authenticated, proceed to protected route
            next();
        } else {
            // Invalid credentials, respond with 401 Unauthorized
            res.status(403).json({
                msg: "User doesnot exist"
            })
        }
    })
}

module.exports=userAuthentication