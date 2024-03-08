const mongoose = require("mongoose");
const connectDatabase = async () => {
  try {
    const connection = await mongoose
      .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((data) => {
        console.log(`mongod connected with HOST: ${data.connection.host}`);
      });
  } catch(error) {
    console.error("Unable to connect to the database:", error.message);
    throw new Error("Unable to Connect To Database");
  }
};

module.exports = connectDatabase;
