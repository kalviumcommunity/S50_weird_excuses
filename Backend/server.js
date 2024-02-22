require('dotenv').config();
const express=require("express")
const cors=require("cors")
const database = require("./config/database");
const homeroute =require("./routes/home")
const excuseroute = require("./routes/excuses")

const app = express()
const port = process.env.PORT;

const corsOptions = {
    origin: ['http://localhost:3000'], 
    optionsSuccessStatus: 200 
  };
  
  app.use(cors(corsOptions));

app.use(express.json())

app.use("/",homeroute)
app.use("/",excuseroute)

database();

app.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log("Server listening on port", port);
    }
});
