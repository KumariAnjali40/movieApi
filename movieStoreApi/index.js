const express= require('express');
const { connection } = require('./db');


const {movieRouter}=require('./routes/movies.routes');

const app=express();

app.use(express.json());
app.use('/movies',movieRouter);








app.listen(4500,async()=>{
    try{
        await connection;
        console.log("Connected To DB");
        console.log("Server is Running at Port 4500")
    }
    catch(err){
        console.log(err);
    }
})