const User = require("../../model/user")

exports.create_user = async (req , res) => {
    try{
        const {firstName , lastName } = req.body;
        const user = await User.create({firstName , lastName})
        res.json({message : "User Added Successfully" , user})
    }
    catch(error){
        res.status(500).send("An error occurred" + "\n" + error.message);
    }
};