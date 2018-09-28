const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const routes        = require('./routes/post');
const routesUser    = require('./routes/user');
const cors          = require('cors');
const mydomain      = process.env.PORT | 3000;


//Connect mongodb
//MongoClient.connect("mongodb://localhost:27017/mean-web", { useNewUrlParser: true });

mongoose.connect('mongodb://localhost:27017/mean-web',  { useNewUrlParser: true });

mongoose.connection.on('connected', () =>{
    console.log('Mongodb is connected with DB mean-web');
})
mongoose.connection.on('error', (err) =>{
    if(err)
    console.log('Mongodb is not connected');
});

// Use Cors
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  "Access-Control-Allow-Origin", "*";
//Setting middle ware

app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

//Routes API use
app.use('/api', routes);

//Routes User
app.use('/user', routesUser);


app.listen(mydomain, (err, res) =>{

    if(err){
        console.log('Something went wrong');
    }
    else {
        console.log('Running on '+ mydomain);
    }
});