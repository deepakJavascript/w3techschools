const express = require('express');
const postModel = require('../models/post-model');

const router = express.Router();

router.get('/posts', (req, res, next) => {

    postModel.find(function(err, result){
        
            res.json(result);
        
    })
    //res.json({message: 'This is Post Page'});
});

router.post('/post', (req, res, next) => {

    const newPost = new postModel({

        title : req.body.title,
        content : req.body.content
    });

    newPost.save(function(err, result) {

        if(err){
            res.json({message: 'Something went wrong'+err});
        }
        else{
            res.json({message: 'Data Submitted'+result});
        }
    })
});

router.delete('/post/:id', (req, res, next) => {

    postModel.deleteOne({_id: req.params.id}, function(err, result){

        if(err){
            res.json({message:"something went wrong"+err});
        }
        else{
            res.json({message:"Post deleted successfully"});
        }
    })
    
});
module.exports = router;