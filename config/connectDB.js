import mongoose from "mongoose";

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to mongodb`.bgMagenta.white);
    } catch (error) {
        console.log(`Error in mongodb connections`.bgRed.white);
    }
};

export default connectDB;