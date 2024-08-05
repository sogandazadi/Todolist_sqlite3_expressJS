const express = require('express');
const sequelize = require('./database');
const todosRouter = require("./routes/todos")
const bodyParser = require("body-parser")

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use("/todos" , todosRouter);

sequelize.sync().then(() => {
  //console.log('Database synchronized');
});

app.listen(PORT, () => {
});

module.exports = app;