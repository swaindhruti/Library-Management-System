// Middleware for handling the library admin authentication

const { Admin } = require("../db/models")

function adminAuthentication(req, res, next) {
    // Extract credentials from request headers
    const username = req.headers.username;
    const password = req.headers.password;

    // Attempt to find matching admin record in database
    Admin.findOne({
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
                msg: "Admin doesnot exist"
            })
        }
    })
}

module.exports=adminAuthentication