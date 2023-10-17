const mongoose = require('mongoose')

let MONGO_URI = process.env.MONGO_URI

const dbConnection = async ()=>{
    await mongoose.connect(MONGO_URI)
    .then((conn)=>(console.log(`Connected to DB ${conn.connection.host}`)))
    .catch((error)=>{
        console.log(error.message);
        process.exit(1);
    })
}

module.exports = dbConnection
