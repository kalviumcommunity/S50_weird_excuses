require('dotenv').config();
const express=require("express")
const cors=require("cors")
const database = require("./config/database");
const homeroute =require("./routes/home")
const excuseroute = require("./routes/excuses")
const app = express()
const port = process.env.PORT;


database();
  
app.use(cors());

app.use(express.json())
app.use("/users",homeroute)
app.use("/excuse",excuseroute)


app.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log("Server listening on port", port);
    }
});
