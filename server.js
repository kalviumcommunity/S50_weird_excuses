const express=require("express")
require('dotenv').config();

const app = express()

const port = process.env.PORT;

app.get("/ping",(req,res)=>{
    res.json({name:"Pratham Shailesh Dsouza"})
})

app.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log("Server listening on port", port);
    }
});
