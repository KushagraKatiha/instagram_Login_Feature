const User = require("../model/userModel.js");
const emailValidator = require("email-validator");
const bcrypt = require("bcryptjs");

exports.home = (req, res) => {
  res.send("<h1>It is the home page !!</h1>");
};

exports.signUp = async (req, res) => {
  try {
    const { name, username, email, password, confirmPassword, bio } = req.body;
    console.log("Data Received");
    console.log(name, username, email, password, confirmPassword, bio);
    // Check if all the fields are filled
    if (!name || !username || !email || !password || !confirmPassword || !bio) {
      throw new Error(`All the fields are required`);
    }

    if (password !== confirmPassword) {
      throw new Error(`Password and Confirm Password did/n't match`);
    }

    let encPass = await bcrypt.hash(password, 8);

    let validEmail = emailValidator.validate(email);
    if (!validEmail) {
      throw new Error(`Enter a valid email !!`);
    }

    let userExistsByUsername = await User.findOne({ username });
    let userExistsByEmail = await User.findOne({ email });

    if (userExistsByUsername) {
      throw new Error(`username Already Exists`);
    }
    if (userExistsByEmail) {
      throw new Error(`email Already Exists`);
    }

    const newUser = await User.create({
      name,
      username,
      email,
      password: encPass,
      bio,
    });

    res.status(200).json({
      success: true,
      message: "User Created Successfully",
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.signIn = async (req, res) => {
  const {email, password} = req.body;
  try {
    console.log(email, password);

    if (!email || !password) {
      throw new Error(`All the fields are required`);
    }

    let userDetails = await User.findOne({email}).select('+password')

    if(!userDetails){
        throw new Error(`No user registered with given details`)
    }
    

    if((!await bcrypt.compare(password, userDetails.password))){
        throw new Error(`Password mismatched`)
    }


    const jsonToken = userDetails.jwtToken();
    userDetails.password = undefined;

    const cookieOption = {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    }

    res.cookie("token", jsonToken, cookieOption)

    res.status(200).json({
        success: true,
        userDetails
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) =>{
    let {id,email} = req.client;

    try{
      const user = await User.findById({email});

      res.status(200).send({
        success: "true",
        userData: user
      })
      
    }catch(error){
      res.status(501).send({message: error.message})
    }
}

exports.signOut = (req, res) =>{
    try {

      const cookieOption = {
        expires: new Date(),
        httpOnly: true
      }
      res.cookie("token", null, cookieOption)
      res.status("200").json({
        success: true,
        message: "User Logged Out Successfully"
      })

    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      })
    }
}