const User = require("../../model/user");
const Task = require("../../model/todo")

exports.searchUser = async (req, res) => {
  try{
    const userId = req.params.ID;
    const user = await User.findByPk(userId);
    if(user){
      const user_tasks = await Task.findAll({where: { user_id: userId , },});
      if(user_tasks.length>0){
        res.send(JSON.stringify({user , user_tasks} , null , 2))
        return;
      }
      else{
        res.send(JSON.stringify(user , null , 2) + "\n" + "User doesnt have any tasks")
        return;
      }
    }
    res.status(404).send("User not found")
  }
  catch(error){
    res.status(500).send("An error occurred" + "\n" + error.message);
  }
};