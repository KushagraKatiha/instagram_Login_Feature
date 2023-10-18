require('dotenv').config()
const express = require('express')
const cors = require('cors')
const dbConnection = require('./config/db.js')
const router = require('./routes/userRoutes.js')
const cookieParser = require('cookie-parser')


const app = express()
app.use(cors({
    origin: ["http://127.0.0.1:5502", "http://localhost:5502"],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
dbConnection()
app.use(cookieParser())
app.use("/", router)

module.exports = app