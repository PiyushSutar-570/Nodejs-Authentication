require('dotenv').config();

const express = require('express');
const connectToDB = require('./database/db');
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');
const uploadImageRoutes = require("./routes/image-routes");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/auth',authRoutes); //authentication
app.use('/api/home',homeRoutes); //home page
app.use('/api/admin',adminRoutes); //admin page
app.use("/api/image", uploadImageRoutes); //image routes

connectToDB();

app.listen(PORT,()=>{
    console.log("The server is now listening to the port-",PORT);
});