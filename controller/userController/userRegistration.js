const User = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler')
const dotenv = require("dotenv").config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET , { expiresIn: "30m" });
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
        res.status(400).send("Email alreday exist");
    }
    else if(usernameExists ){
        res.status(400).send("username already taken")
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

    const token = generateToken(user.id);
    user.token = token;
    await user.save();

    if (user) {
        res.status(201).json({
        _id: user.id,
        firstName,
        lastName,
        username,
        email,
        token
        });

      } else {
        res.status(400).send("Invalid user data");
      }
});