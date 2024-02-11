const express = require("express")
const bodyParser = require("body-parser")
const admin_routes = require('./Routes/Admin_routes')
const users_routes = require('./Routes/Users_routes')
const app = express()

// Middlewares for parsing request bodies
app.use(bodyParser.json())
app.use('/admin', admin_routes)
app.use('/users', users_routes)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`The app is listening on PORT : ${PORT}`)
})