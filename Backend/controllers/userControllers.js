const User = require("../model/userModel.js");
const emailValidator = require("email-validator");
const bcrypt = require("bcryptjs");

exports.home = (req, res) => {
  res.send("<h1>It is the home page !!</h1>");
};

exports.signUp = async (req, res) => {
  try {
    const { name, username, email, password, confirmPassword, bio } = req.body;
    // console.log("Data Received");
    // console.log(name, username, email, password, confirmPassword, bio);
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
  const {username, password} = req.body;
  try {
    // console.log(username, password);

    if (!username || !password) {
      throw new Error(`All the fields are required`);
    }

    let userDetails = await User.findOne({username}).select('+password')

    if(!userDetails){
        throw new Error(`No user registered with given details`)
    }
    

    if((!await bcrypt.compare(password, userDetails.password))){
        throw new Error(`Password mismatched`)
    }

    userDetails.password = undefined;

    const token = userDetails.jwtToken();

    const cookieOption = {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    }

    res.cookie("token", token, cookieOption)

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
    // console.log("Client from get user=>",req.client);
    let username = req.client.username;
    // console.log(`Username: ${username}`);
    try{
      const user = await User.findOne({username});

      res.status(200).send({
        success: "true",
        userData: user
      })
      console.log(user);
      
    }catch(error){
      res.status(400).send({message: error.message})
    }
}

exports.signOut = (req, res) =>{
    try {

      const cookieOption = {
        expires: new Date(),
        httpOnly: true
      }
      res.cookie("token", null, cookieOption)
      res.status(200).json({
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