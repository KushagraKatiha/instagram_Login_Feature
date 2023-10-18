const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name can't be more than 50 characters"],
        minLength: [1, "Name should be greater than 1 character"]
    }, 
    username:{
        type: String,
        required: [true, "Username is reqruired"],
        maxLength: [40, "Username can't be more than 50 characters"],
        minLength: [5, "Username can't be less than 5 characters"],
        trim: true,
        unique: true
    },
    email:{
        type: String,
        required: [true, "email is required"],
        trim: true, 
        unique: true
    },
    password:{
        type:String,
        required: [true, "password is required"],
        minLength: [6, "password should be more than 6 characters"],
        select: false
    },
    forgetPasswordToken:{
        type: String
    },
    forgetPasswordTokenExpire:{
        type: String
    },
    bio:{
        type:String,
        maxLength: [300, "bio can't be more than 300 words "]
    }
},
    {timestamps: true}
) 

userSchema.methods = {
    jwtToken(){
        return  JWT.sign(
            {id: this._id, username: this.username},
            process.env.SECRET,
            {expiresIn: '24h'}
        )

    }
}


module.exports = mongoose.model("User", userSchema)