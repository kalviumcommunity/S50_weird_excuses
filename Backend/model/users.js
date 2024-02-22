const mongoose=require("mongoose")

let userSchema = new mongoose.Schema({
    "User_Name": String,
    "Email": String,
    "Password": String
})

let postschema = new mongoose.Schema({
    "User_Name":String,
    "Excuse":String,
    "Comments":Array
})


const usermodel =mongoose.model("User Detail",userSchema)
const postmodel=mongoose.model("Excuse",postschema)

module.exports ={usermodel,postmodel};