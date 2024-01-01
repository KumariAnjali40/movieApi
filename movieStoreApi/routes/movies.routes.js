const express=require('express');

const {MovieModel}=require('../models/movies.models');
const { constants } = require('buffer');

const movieRouter=express.Router();

//get
movieRouter.get('/',async(req,res)=>{
    try {
        let movies=await MovieModel.find()
        // console.log(req.params.key)
        res.send(movies);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})


//filter sort //pagination
movieRouter.get('/testing', async (req, res) => {
    try{
         let query={};
         if(req.query.title){
            query.title=new RegExp(req.query.title, 'i');
         }

         if(req.query.rating){
            query.rating=(req.query.rating);
         }

         if(req.query.releaseYear){
            query.releaseYear=(req.query.releaseYear);
         }

         let sort='name';
         if(req.query.sortBy){
            sort=req.query.sortBy;
         }
        
         //pagination
         let page=1;
         let limit=5;
         if(req.query.page){
            page=+(req.query.page);
         }
         if(req.query.limit){
            limit=+req.query.limit;
         }

         const movies=await MovieModel.find(query).sort(sort).skip((page-1)*limit).limit(limit);

         res.status(200).json({movies});

    }catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});




//post
movieRouter.post('/add',async(req,res)=>{
    const payload=req.body
    try{
       const movie=new MovieModel(payload);
       await movie.save();
       res.json({msg:"The new movie has been added",new_movie:payload})
    }
    catch(err){
        res.json(err);
    }
})



//patch
movieRouter.patch("/update/:movieID",async(req,res)=>{
    const {movieID}=req.params;
    const payload=req.body;
    try{
       await MovieModel.findByIdAndUpdate({_id:movieID},payload)
       res.status(200).json({msg:"The user with ID:${movieID} has been updated"})
    }catch(err){
      res.status(400).json({error:err});
    }
})


//delete
movieRouter.delete("/delete/:movieID",async(req,res)=>{
    const{movieID}=req.params;
    try{
        await MovieModel.findByIdAndDelete({_id:movieID})
        res.status(200).json({msg:"The movie with ID ${movieID} has been deleted" })
    }
    catch(err){
        res.status(400).json({error:err});
    }
})

module.exports={
    movieRouter
}