//Todos 

//get mongo shell working


// Variable set ups
const express = require('express'); 
const mongoose = require('mongoose'); 
const mongo = require('mongodb'); 
const path = require('path'); 
const cors = require('cors');
const bodyParser = require('body-parser'); 
const app = express();
const Person = require('./models/people.js');
const seed = require('./seed.js'); 
const MLAB_URL = 'mongodb://troutman:password@ds261838.mlab.com:61838/microwave_queue';
 
//App configuration
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'public')));  
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
 

//Connect to your db
mongoose.connect(MLAB_URL, (err, db) => {
    if(err){
        console.log(err);
    }else{
        console.log(`You conncected to your ${MLAB_URL} DB...`); 
    }
});

//Seed Data: Remove all prev data and add seed data.
seed(); 

//////////////////
////DB Routes/////
//////////////////

//Get all 
app.get('/person',(req, res) =>{
    console.log('There was as GET request to the server...')
    Person.find({}, (err, people) => {
        if(err){
            console.warn('Error in the /data route: ', err); 
        }else{
            console.log('People: ', people);
            res.send(people); 
        }
    });
});

//Add one 
app.post('/person', (req, res) => {
    console.log('There was a POST request to the server...'); 
    console.log(`request.body normal is ${req.body.name}`);
    newPerson = {name: req.body.name}; 
    Person.create(newPerson, (err, createdPerson) => {
        if(err){
            console.log(err);
        }else{
            console.log(`${createdPerson} was added to the DB...`);
            res.status(200).json(createdPerson);
        }
    }); 
}); 

//Delete one
app.delete('/person/:id', (req, res) => {
    console.log('There was a DELETE Request to the server...');
    console.log(req.params.id); 
    let toBeDeleted = {_id:req.params.id};
    Person.findByIdAndRemove(toBeDeleted, (err, deleted) => {
        if(err){
            console.log(err)
        }else{
            console.log(`${deleted} was removed from DB`);
            res.status(200).json(deleted); 
        }
    }); 
});



//Server lisening
const port = 3001;
app.listen(port, ()=>{
    console.log(`server is listening on ${port}...`);
});