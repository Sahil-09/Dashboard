const http=require('http')
const app=require("./app");
const mongoose=require("mongoose")
const server=http.createServer(app)

const PORT=3000

mongoose.connect("mongodb+srv://test9:test9@cluster0.0hdw3.mongodb.net/Dash?retryWrites=true&w=majority").then(()=>{
    server.listen(3000,()=>{
        console.log("Server running on port:"+PORT+"\nDatabase is connected...")
    })
}).catch(err=>{
    console.log(err)
})
