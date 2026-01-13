const Image = require('../models/Image');
const uploadToCloudinary = require('../helpers/cloudinaryHelper');
const cloudinary = require('../config/cloudinary');

const uploadImageController = async(req,res)=>{
    try {

        if(!req.file){
            return res.status(404).json({
                success : false,
                message : "File is required ! Please updload an image !"
            });
        }

        const {url,publicId} = await uploadToCloudinary(req.file.path);

        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy : req.userInfo.userId
        })

        await newlyUploadedImage.save();

        res.status(201).json({
            success : false,
            message : 'Image uploaded successfully !'
        });
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Something went wrong !'
        })
    }
}


module.exports = {
    uploadImageController
}