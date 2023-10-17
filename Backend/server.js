const app = require('./app.js')

let PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is listining at port ${PORT}`);
})