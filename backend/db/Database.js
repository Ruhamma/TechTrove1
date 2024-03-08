const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then((con) => {
        console.log(
          `MongoDB Database connected with HOST: ${con.connection.host}`
        );
      });
  } catch {

    console.error("Unable to connect to the database:", error.message);
    throw new Error("Unable to connect to database" );
  }
};
module.exports = connectDatabase;
