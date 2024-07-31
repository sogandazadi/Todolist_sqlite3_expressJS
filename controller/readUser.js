const User = require("../model/user");
const {Op} = require("sequelize")

function hasFirstName(obj) {
  return obj.firstName !== undefined
}
function hasLasttName(obj) {
    return obj.lastName !== undefined
  }

function hasFNameandLName(obj) {
  return obj.firstName !== undefined && obj.lastName !== undefined
}


exports.search_user = async (req, res) => {
  try{
    const user_id = req.params.ID;
    const { firstName , lastName } = req.query;
    let condition = {};
    if(user_id){
      const user = await User.findByPk(user_id);
      res.send("User : " + JSON.stringify(user, null, 2));
      console.log('User :', JSON.stringify(user, null, 2));
    }
    else{
      switch (true) {
        case hasFNameandLName(req.query):
          condition.firstName = firstName
          condition.lastName = lastName;
          break
        case hasFirstName(req.query):
          condition.firstName = firstName;
          break
        case hasLasttName(req.query):
          condition.lastName = lastName
          break
      }
      const all_users = await User.findAll({where: condition});
      res.send("Users : " + JSON.stringify(all_users, null, 2));
      console.log('Users :', JSON.stringify(all_users, null, 2));
    }

  }
  catch(err){
    console.log(err)
  }
};