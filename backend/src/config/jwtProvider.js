const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET || process.env.SECERET_KEY || "snxbeuzbjerrayeabbtgakenbbhggyuutwerlmjsospexndbusnakdo";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
  return token;
};

const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken.userId;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

module.exports = { generateToken, getUserIdFromToken };
