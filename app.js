const express= require('express');
const PORT = 5000;
const fs = require('fs');
const app = express();
app.set("views","./views")
app.set("view engine","ejs")

app.use(express.json());
app.use(express.urlencoded({extended:false}));
const mainRoutes= require('./index');
app.use("/",mainRoutes);
app.listen(PORT,(err)=>{
    if(err) {throw err}
    else {
        console.log(`Server Works on ${PORT}`);
    }
})