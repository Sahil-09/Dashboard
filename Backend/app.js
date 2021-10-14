const express=require('express')
const app=express()
const cors=require('cors');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const User=require("./Usermodel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const adminvalid=require("./admin-valid")

app.use(cors())

app.use(bodyparser.json())

app.get("/users",adminvalid,(req,res)=>{
    User.find({Email:req.user.Email}).then(curruser=>{
        User.find().then(data=>{
            res.json({users:data,current:curruser})
        })
    })
})

app.post("/signup",(req,res)=>{
    // User.find({Email:req.body.Email}).then(user=>{
        // if(user.length==0){
            bcrypt.hash(req.body.Password,10).then(hashpas=>{
                let user=new User({
                    Name:req.body.Name,
                    Password:hashpas,
                    Gender:req.body.Gender,
                    Email:req.body.Email,
                    Phone:req.body.Phone,
                    Date:req.body.Date,
                    Address:req.body.Address,
                    Role:req.body.Role || "User"
                })
                user.save(err=>{
                    console.log(err)
                    res.status(200).json({error:"Email already exist"})
                }).then(res=>{
                    res.status(200).json({result:"Successfully signup"})
                })
            })
        
        
    // })
   
})

app.post("/login",(req,res)=>{
    User.findOne({Email:req.body.Email}).then(user=>{   
    bcrypt.compare(req.body.Password,user.Password).then(data=>{
        if(data==true){
            const token=jwt.sign({Email:user.Email,Name:user.Name,Role:user.Role},"secretsecret")
            res.status(200).json({token:token})
        }
    }).catch(err=>{
        res.status(200).json({result:"Not authorised"})
    })
})})


app.delete("/delete/:id",(req,res)=>{
    let id=req.params.id
    User.deleteOne({_id:id}).then(()=>{
        console.log("delete"+id)
        res.status(200).json({result:"Deleted!"})
    })
})


app.put("/update",(req,res)=>{
    bcrypt.hash(req.body.Password,10).then(hashpas=>{
        console.log(req.body)
    User.findOne({_id:req.body.id}).then(user=>{
            console.log(user)
            user.Name=req.body.Name,
            user.Password=hashpas,
            user.Gender=req.body.Gender,
            user.Email=req.body.Email,
            user.Phone=req.body.Phone,
            user.Date=req.body.Date,
            user.Address=req.body.Address,
            user.Role=req.body.Role || "User"
            user.save()
        }).then(result=>{
        console.log("Updated")
        res.json({result:"Updated!"})
    })    
})
})




module.exports=app