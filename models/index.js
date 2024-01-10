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
  .catch((error) => {
    console.log(`Error connecting to Db`);
    console.log(`Error is ${error}`);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel")(sequelize, DataTypes);
db.users.sync({ alter: true });

/* db.order = require("./orderDetails")(sequelize, DataTypes);
db.order.sync({ alter: true }); 
 */
const orderModels = require("./orderDetails")(sequelize, DataTypes);
db.order = orderModels.Order;
db.item = orderModels.Item;
db.shippingDetail = orderModels.ShippingDetail;
db.billingDetail = orderModels.BillingDetail;

// Sync all models
db.order.sync({ alter: true });
db.item.sync({ alter: true });
db.shippingDetail.sync({ alter: true });
db.billingDetail.sync({ alter: true });
module.exports = db;
