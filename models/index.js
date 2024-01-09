const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  `postgres://postgres:test1324@localhost:5432/training`,
  { dialect: "postgres" }
); // Example for postgres database connection

sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected!!!`);
  })
  .catch((err) => {
    console.log(`Error connecting to Db`);
    console.log(`Error is ${error}`);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel")(sequelize, DataTypes);
db.users.sync({ alter: true });

db.order = require("./orderDetails")(sequelize, DataTypes);
db.order.sync({ alter: true });

module.exports = db;
