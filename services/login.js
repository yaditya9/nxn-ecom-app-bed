const db = require("../models");
var createError = require("http-errors");
const { Op } = require("sequelize");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const encryptPassword = async (password, salt) => {
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePasswords = async (password, passwordFromDB) => {
  return password === passwordFromDB ? true : false;
};

module.exports = async function (email, password) {
  console.log(`Inside login service`);
  console.log(`Please execute login for user ${email} and pass ${password}`);
  try {
    let dbUser = await db.users.findAll({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });
    if (dbUser.length === 0) {
      const error = new Error("User not found");
      error.status = 401; // Set the status code
      throw error;
    }
    dbUser = dbUser[0].dataValues;
    const passwordFromUI = await encryptPassword(password, dbUser.salt);
    const result = await comparePasswords(passwordFromUI, dbUser.password);
    if (result) {
      console.log(`Passwords match! generate Token`);
      const token = jwt.sign({ userId: dbUser.email }, "your-secret-key", {
        expiresIn: "1h",
      });

      //console.log(`generated token ${token}`);
      return { token: token };
    } else {
      console.log(`userID password didn't match`);
      throw createError(401, "Incorrect password");
    }
  } catch (error) {
    console.error(`error is`);
    console.error(error);
    throw error /* createError(500, "Something went wrong!") */;
  }
};
