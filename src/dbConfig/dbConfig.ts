import mongoose from "mongoose";


 async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Connected to database successfully");
        })
        connection.on("error", (error) => {
            console.error("Error connecting to database: ", error);
            process.exit(1);
        })
         
    } catch (error) {
        console.error("Error connecting to database: ", error);
    }
}
export default dbConnect;