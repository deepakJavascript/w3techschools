const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String, required:true},
    posted: {type:Date, default:Date.now()}
});

const postModel = module.exports = mongoose.model('Post', postSchema);