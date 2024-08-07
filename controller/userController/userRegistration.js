const User = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler')
const dotenv = require("dotenv").config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET , { expiresIn: "1h" });
  };

exports.registerUser = asyncHandler(async (req, res) => {
    const { firstName , lastName , email , username , password } = req.body;
    
    if (!firstName || !lastName || !email || !username || !password) {
        res.status(400).send("Please add all fields");
    }
    
    // check if user exists
    const emailExists = await User.findOne({ where: {email : email} });
    const usernameExists = await User.findOne({ where : {username : username}});
    
    if (emailExists) {
        res.status(409).send("Email alreday exist");
    }
    else if(usernameExists ){
        res.status(409).send("username already taken")
    }
    
    // create hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // create user
    const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword,
    });

    if (user) {
        const token = generateToken(user.id);
        res.cookie("token" , token , {httpOnly:true , secure:process.env.NODE_ENV === "production" ,sameSite:"strict" , maxAge: 30 * 60 * 1000});
        res.status(201).json({
        _id: user.id,
        firstName,
        lastName,
        username,
        email,
        });

      } else {
        res.status(400).send("Invalid user data");
      }
});