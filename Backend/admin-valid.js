const jwt=require("jsonwebtoken");
const User=require("./Usermodel");


module.exports=(req,res,next)=>{
    try{
        const token=req.headers.auth;
        const decodedtoken=jwt.verify(token,"secretsecret")
        if(decodedtoken.Role=="Admin"){
            req.user={Email:decodedtoken.Email,Role:decodedtoken.Role}
            next();
        }
        if(decodedtoken.Role=="User"){
            User.findOne({Email:decodedtoken.Email}).then(user=>{
                let finaluser=[]
                finaluser.push(user)
                console.log("here")
                return res.json({users:[],current:finaluser})
            })
        }
    }catch(err){
       res.json({message:"unauthorised"})
    }
}