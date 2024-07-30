const express = require('express');
const sequelize = require('./database');
const TaskRoutes = require('./routes');
const bodyParser = require("body-parser")

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended : true}))
app.use(TaskRoutes);

sequelize.sync().then(() => {
  console.log('Database synchronized');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});