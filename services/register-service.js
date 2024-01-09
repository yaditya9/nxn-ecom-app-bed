const valid = require("../validator/register-validator");
const reduceTheSpeed = require("../services/vehicle");
const db = require("../models");
var createError = require("http-errors");
var bcrypt = require("bcryptjs");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const encryptPassword = async (password, salt) => {
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = async function (name, email, password) {
  console.log(`Inside register service`);
  if (valid(name, email, password)) {
    var salt = bcrypt.genSaltSync(10);
    console.log(salt);
    password = await encryptPassword(password, salt);
    const user = { name: name, email: email, password: password, salt: salt };
    await db.users.create(user);
    return "Registration successful";
  } else {
    throw createError(400, "Invalid input provided");
    // await sleep(5000);
    // return "Input data is not valid"
  }
};
