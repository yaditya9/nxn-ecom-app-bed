const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("sequelize");
const db = require("./models");
var cors = require("cors");
const register = require("./services/register-service");
const login = require("./services/login");
const app = express();
const port = 3001;

app.use(cors());
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/trainings", (req, res) => {
  res.send(`Training on nodejs!`);
});

app.post("/register", cors(corsOptions), async (req, res) => {
  console.log(`Registration starts`);
  console.log(req.body);
  try {
    const result = await register(
      req.body.name,
      req.body.email,
      req.body.password
    );
    return res.json({ result: result });
  } catch (error) {
    console.log(`error is ${JSON.stringify(error)}`);
    return res.status(error.status).send(error.message);
  }
});

app.post("/login", cors(corsOptions), async (req, res) => {
  console.log(`Inside login`);
  try {
    const result = await login(req.body.email, req.body.password);
    //return res.json({ result: result });
    return res.json({ result: result.token });
  } catch (error) {
    console.error(`error is ${JSON.stringify(error)}`);
    if (error.status && error.message) {
      return res.status(error.status).send(error.message);
    }

    // For any other errors, send a generic error message
    return res.status(500).send("An error occurred");

    /* return res.status(error.status || 500).send(error.message || 'Something went wrong!'); */
  }
});

/**
 * Returns list of products
 */
app.get("/products", cors(corsOptions), (req, res) => {});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
