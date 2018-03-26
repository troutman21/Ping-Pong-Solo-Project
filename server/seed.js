const mongoose = require('mongoose'); 
const People = require('./models/people.js');


module.exports = () => {
    People.remove({}, (err, deleted) => {
        if(err){
            console.log(err); 
        }else{
            console.log('All people have been removed'); 
        }
    });
    
    let created = [{name: 'Ben'}, {name: 'Paul'}, {name: 'Phillip'}, {name: 'Esther'}]; 

    People.create(created, (err, people) => {
        if (err){
            console.log(err); 
        }else{
            console.log('People were created:'); 
            console.log(people); 
        }
    });
    console.log('Seed was invoked'); 
}