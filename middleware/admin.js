// Middleware for handling the library admin authentication

const { Admin } = require("../db")

function adminAuthentication(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    Admin.findOne({
        username: username,
        password: password
    })
        .then(function (value) {
            if (value) {
                next();
            } else {
                res.status(403).json({
                    msg: "Admin doesnot exist"
                })
            }
        })
}

module.exports=adminAuthentication