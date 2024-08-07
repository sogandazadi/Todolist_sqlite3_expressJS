const jwt = require("jsonwebtoken");
const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv").config();

exports.auth = asyncHandler (async (req , res , next) => {
    let token;
    if(req.cookies.token){
        try{
            token = req.cookies.token;
            const decoded = jwt.verify(token , process.env.JWT_SECRET );
            req.user = await User.findByPk(decoded.id );
            next();
        }
        catch(error){
            res.status(401).send("Not authorized")
        }
    }
    else
    res.status(401).send("Not authorized")
})