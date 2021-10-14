const mongoose=require("mongoose")
const schema=mongoose.Schema
const user=new schema({
    Name:{type:String},
    Gender:{type:String},
    Password:{type:String},
    Email:{type:String,required:true,unique:true},
    Phone:{type:Number},
    Date:{type:String},
    Role:{type:String},
    Address:{type:String}
})

module.exports=mongoose.model("User",user)