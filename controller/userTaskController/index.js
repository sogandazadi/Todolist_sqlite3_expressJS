const User = require("../../model/user")
const Task = require("../../model/todo")

User.hasMany(Task ,{foreignKey : 'user_id' , as: "tasks"} );
Task.belongsTo(User ,{foreignKey : 'user_id' , as: "user"} );


exports.all_users = async (req , res) => {
    try{
        const users = await User.findAll({
            include: [
              {
                model: Task,
                as: "tasks"
              },
            ],
            order: [
               [{model: Task , as:"tasks"} , "createdAt" , "DESC"]
            ],
          });

          res.send(JSON.stringify(users , null , 2))
    }
    catch(error){
        res.status(500).send("An error occurred" + "\n" + error.message);
    }
};
