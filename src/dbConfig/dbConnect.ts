import mongoose from "mongoose";

export const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URI!)
    .then((res) => console.log(`Databse is successfully connected with ${res.connection.host}`))
    .catch((err : any) =>{ 
        console.log(`Error while connecting with database--> ${err.message}`);
        process.exit(1);
    })
}