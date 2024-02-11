// Middleware for handling the library user authentication

const { User } = require("../db")

function userAuthentication(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    User.findOne({
        username: username,
        password: password
    })
        .then(function (value) {
            if (value) {
                next();
            } else {
                res.status(403).json({
                    msg: "User doesnot exist"
                })
            }
        })
}

module.exports=userAuthentication