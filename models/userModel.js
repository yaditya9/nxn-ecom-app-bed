module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true, //checks for email format
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
    },
    { timestamps: true }
  );
  return User;

  User.associate = (models) => {
    User.hasMany(models.Order); // Assuming a customer can have multiple orders
  };
};
