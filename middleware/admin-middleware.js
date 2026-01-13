

const isAdminUser = (req,res,next)=>{
    console.log(req.userInfo.role);
    if(req.userInfo.role!=="admin"){
        return res.status(403).json({
            success : false,
            message : 'Access denied ! Admin rights required !'
        })
    }
    next();
}

module.exports = isAdminUser;