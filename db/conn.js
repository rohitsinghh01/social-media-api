const mongoose = require('mongoose');

const URI = "mongodb://127.0.0.1:27017/interntask";
const connectDB = async () => {
  try {
    const con = await mongoose.connect(URI);
    console.log('DB Connected Successfully');
  } catch (e) {
    console.log(`Authentication to database failed`);
    process.exit(1);
  }
};

module.exports = connectDB;
  