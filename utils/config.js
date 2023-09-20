const { config } = require("dotenv");

const {
  JWT_SECRET,
  NODE_ENV,
  PORT = 3000,
  URL = "mongodb://127.0.0.1:27017/bitfilmsdb",
} = process.env;

if (NODE_ENV === "production") {
  config();
}

const SECRET_KEY = NODE_ENV === "production" && JWT_SECRET ? JWT_SECRET : "dev-secret-key";

module.exports = {
  PORT,
  URL,
  SECRET_KEY,
  NODE_ENV,
};
