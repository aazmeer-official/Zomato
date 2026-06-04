const mongoose = require("mongoose")
const uri = process.env.dbURL;

const connectDB = async () => {
  await mongoose.connect(uri);
  console.log("MongoDB connected");
};

module.exports = connectDB;
