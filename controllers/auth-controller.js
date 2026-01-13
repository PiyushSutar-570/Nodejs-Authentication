const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register controller
const registerUser = async(req,res)=>{
    try {
        //first extract user info from req body

        const {username,email,password,role} = req.body;

        //check if the user already exists in our database

        const checkExistingUser = await User.findOne({$or : [{username},{email}]});

        if(checkExistingUser){
            return res.status(400).json({
                success : false,
                message : 'User already exists either with same email or username ! Please try with different username or email !'
            })
        }

        //hash user password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create a new user and save in your database
        const newlyCreatedUser = new User({
            username ,
            email,
            password : hashedPassword,
            role : role || 'user'
        })

        await newlyCreatedUser.save();

        if(newlyCreatedUser){
            res.status(200).json({
                success : true,
                message : 'User registered successfully'
            })
        }
        else{
            res.status(400).json({
                success : false,
                message : 'User is unable to register'
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Something went wrong !'
        })
    }
}

//login controller

const loginUser = async(req,res)=>{
    try {
        const {username,password} = req.body;

        //find if the current user exists in the database

        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({
                success : false,
                message : 'User does not exist !'
            })
        }

        //if the password is correct or not
        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success : false,
                message : 'Invalid username or password !'
            })
        }

        const accessToken = jwt.sign({
            userId : user._id,
            username : user.username,
            role : user.role
        },process.env.JWT_SECRET_KEY,{
            expiresIn : '30m'
        })

        res.status(200).json({
            success : true,
            message : 'Logged in successfully !',
            accessToken
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Something went wrong !'
        })
    }
}

module.exports = {registerUser,loginUser}