const mongoose=require("mongoose")
const schema=mongoose.Schema
const user=new schema({
    Name:{type:String,required:true},
    Gender:{type:String,required:true},
    Password:{type:String,required:true},
    Email:{type:String,required:true,unique:true},
    Phone:{type:Number,required:true},
    Date:{type:String,required:true},
    Role:{type:String,required:true},
    Address:{type:String,required:true}
})

module.exports=mongoose.model("User",user)