import mongoose from "mongoose";

const connectDB = async (DB_URL) => {
    try{
        const connected = await mongoose.connect(DB_URL)
        console.log(`DB Connected ✅ Host: ${connected.connection.host}, DB: ${connected.connection.name}`);
    }catch(err) {
        console.error("DB not Connected");
    }
}

export default connectDB;