require("dotenv").config();

//mongoose
const mongoose = require("mongoose");

const { MONGODB_URL } = process.env;

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewurlParser: true,
      useunifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

connectToDB();
