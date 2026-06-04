const mongoose = require("mongoose")
const uri = "mongodb+srv://aazmeerofficial_db_user:gK7fhwMNZlWxayNB@cluster0.1nhiikv.mongodb.net/?appName=Cluster0";

const connectDB = async () => {
  await mongoose.connect(uri);
  console.log("MongoDB connected");
};

module.exports = connectDB;
