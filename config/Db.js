import mongoose from "mongoose";

const dbconnect = async () => {
  try {
    const url=process.env.URL
    const dbconn = await mongoose.connect(url);
    if (dbconn) {
      console.log("Database connected");
      return dbconn; // Optionally return the connection object
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Rethrow the error so that calling code can handle it
  }
};

export default dbconnect;
