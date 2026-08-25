require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("./src/models/user.model");
const { connectDb } = require("./src/config/db");

const seedAdmin = async () => {
  try {
    await connectDb();
    const adminEmail = "codewithzosh@gmail.com";
    
    let existingUser = await User.findOne({ email: adminEmail });
    const hashedPassword = await bcrypt.hash("12345678", 8);

    if (existingUser) {
      existingUser.role = "ROLE_ADMIN";
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log("Admin user credentials updated successfully!");
    } else {
      await User.create({
        firstName: "Admin",
        lastName: "ShopSphere",
        email: adminEmail,
        password: hashedPassword,
        role: "ROLE_ADMIN",
        mobile: "9876543210"
      });
      console.log("New Admin user created successfully!");
    }
    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error.message);
    process.exit(1);
  }
};

seedAdmin();
