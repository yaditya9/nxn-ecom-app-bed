// Order Model
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      orderNumber: DataTypes.STRING,
      orderDate: DataTypes.DATE,
      orderTotal: DataTypes.DECIMAL(10, 2),
      itemPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      gst: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      tax: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      shippingCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User);
    Order.hasOne(models.Item);
    //Order.hasMany(models.Item); //For multiple items in 1 order 
    Order.hasOne(models.ShippingDetail);
    Order.hasOne(models.BillingDetail);
  };

  return Order;
};

// Item Model
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    itemSKU: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2),
  });

  return Item;
};

// ShippingDetail Model
module.exports = (sequelize, DataTypes) => {
  const ShippingDetail = sequelize.define("ShippingDetail", {
    name: DataTypes.STRING,
    addressLine1: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
  });

  return ShippingDetail;
};

// BillingDetail Model
module.exports = (sequelize, DataTypes) => {
  const BillingDetail = sequelize.define("BillingDetail", {
    name: DataTypes.STRING,
    addressLine1: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
  });

  return BillingDetail;
};
