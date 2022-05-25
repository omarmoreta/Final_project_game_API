const express = require("express");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const app = express();
const { Sequelize } = require("sequelize");
const usersController = require("./src/controllers/users_controller");
const authenticationController = require("./src/controllers/authentication_controller");

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", usersController);
app.use("/authenticate", authenticationController);

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + "/dist"));

app.use(cors());

const sequelize = new Sequelize(process.env.PG_URI);
// , {
//   ssl: { require: false },
// }
try {
  sequelize.authenticate();
} catch (err) {
  console.log(`Unable to connect to PG: ${err}`);
}

// send the user to index html page inspite of the url

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Nothing Game API",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}!`);
});
