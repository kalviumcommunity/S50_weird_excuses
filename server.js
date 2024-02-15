require('dotenv').config();
const express=require("express")
const database = require("./config/database");
const homeroute =require("./routes/home")
const excuseroute = require("./routes/excuses")

const app = express()
const port = process.env.PORT;

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
