import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    //@ts-ignore
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
