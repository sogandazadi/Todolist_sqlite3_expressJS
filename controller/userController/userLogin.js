const User = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler')
const dotenv = require("dotenv").config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET , { expiresIn: "1h" });
  };

exports.userLogin = asyncHandler(async (req, res) => {
    const { username , password } = req.body;
  
    if (!username || !password) {
      res.status(400).send("Please add all fields");
    }
  
    // Check for user username
    const user = await User.findOne({ where: {username : username} });
  
    if (user && (await bcrypt.compare(password , user.hashedPassword))) {
      const token = generateToken(user.id);
      res.cookie("token" , token , {httpOnly:true , secure:process.env.NODE_ENV === "production" ,sameSite:"strict" , maxAge: 30 * 60 * 1000});

      res.json({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      res.status(400).send("Invalid credentials");
    }
  });
  