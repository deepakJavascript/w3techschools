const express = require('express');
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
//const myPlaintextPassword = 's0/\/\P4$$w0rD';

const route = express.Router();

//Submit Use data  in database

route.post('/register', (req, res, next) =>{

    const newUser = new userModel({
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        password:req.body.password

    });

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
        });
    });

    newUser.save((err, result) =>{
        if(err){
            res.json({message: "Something went wrong"+err});
        }
        else{
            res.json({message:"User is successfully registered"});
        }
    });
});

// Find all users

route.get('/users', (req, res, next) =>{
userModel.find((err, result) => {
    if(err){
        res.json({message: "Something went wrong"+err});
    }
    else{
        res.json(result);
    }
})
});

// Delete User from database

route.delete('/user/:id', (req, res, next) =>{
    userModel.deleteOne({_id:req.params.id}, (err, result) =>{

        if(err){
            res.json({message: "Something went wrong"});
        }
        else{
            res.json({message: "User deleted successfully"});
        }
    })
});

// User Login Route

route.post('/login', (req, res) => {
    // Check if username was provided
    if (!req.body.email) {
      res.json({ success: false, message: 'No username was provided' }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.password) {
        res.json({ success: false, message: 'No password was provided.' }); // Return error
      } else {
        // Check if username exists in database
        userModel.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: err }); // Return error
          } else {
            // Check if username was found
            if (!user) {
              res.json({ success: false, message: 'Username not found.' }); // Return error
            } else {
              const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
              // Check if password is a match
              if (!validPassword) {
                res.json({ success: false, message: 'Password invalid' }); // Return error
              } else {
                  
               const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '24h' }); // Create a token for client
                res.json({
                  success: true,
                  message: 'Success!',
                  token: token,
                  user: {
                    username: user.email
                  }
                }); // Return success and token to frontend

            
               //res.json({success:true, message: 'Logged in successfully'});
              }
            }
          }
        });
      }
    }
    
  });

module.exports = route;