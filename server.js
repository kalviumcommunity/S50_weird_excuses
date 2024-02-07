const express=require("express")

const app = express()

const port = 3000;

app.get("/ping",(req,res)=>{
    res.json({name:"Pratham Shailesh Dsouza"})
})

app.listen(port,()=>{
    console.log("Listening...")
})
