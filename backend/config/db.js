import mongoose from "mongoose";

const connectDB = async () => {
  try 
  {
    const uri = "mongodb+srv://aneeza:49933z4@cluster0.lrqslq4.mongodb.net/?appName=Cluster0";
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } 
  catch (err) 
  {
    console.log("Mongo Error:", err);
  }
};

export default connectDB;
