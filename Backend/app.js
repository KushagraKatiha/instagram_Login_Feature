require('dotenv').config()
const express = require('express')
const cors = require('cors')
const dbConnection = require('./config/db.js')
const router = require('./routes/userRoutes.js')
const cookieParser = require('cookie-parser')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
dbConnection()
app.use(cookieParser())
app.use("/", router)

module.exports = app