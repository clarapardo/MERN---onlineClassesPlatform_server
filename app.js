require("dotenv").config()
require("./db")

const express = require("express")
const app = express()
require("./config")(app)

const projectName = "content-filterer-server"
app.locals.appTitle = `${projectName} created with IronLauncher`

const indexRoutes = require("./routes/index.routes")
app.use("/", indexRoutes)

require("./error-handling")(app)

module.exports = app
