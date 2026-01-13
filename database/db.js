const mongoose = require('mongoose');

const connectToDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo DB is connected successfully !");
    } 
    catch (error) {
        console.error("Mongo DB connection is failed !",error);
        process.exit(1);
    }
}

module.exports = connectToDB;