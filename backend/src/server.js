require("dotenv").config();
const { app } = require("./index");
const { connectDb } = require("./config/db");

const PORT = process.env.PORT || 5454;

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`ShopSphere Backend active on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
