require('dotenv').config();
const express=require("express")
const database = require("./config/database");
const { usermodel,postmodel} = require("./model/users")

const app = express()
const port = process.env.PORT;

app.use(express.json())

database();

app.get("/ping",async(req,res)=>{
    const data = await usermodel.find()
    res.json(data)
})

app.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log("Server listening on port", port);
    }
});
