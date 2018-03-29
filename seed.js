const mongoose = require('mongoose');
const People = require('./models/people.js');
const QueuedPerson = require('./models/queuedPeople.js');


let created = [
    {
        login: 'Paulg05',
        github_id: 27575758,
        avatar_url: 'https://avatars1.githubusercontent.com/u/27575758?v=4'
    }, {
        login: 'NewSky54',
        github_id: 20253865,
        avatar_url: 'https://avatars0.githubusercontent.com/u/20253865?v=4'
    }, {
        login: 'Camaromelt',
        github_id: 7544036,
        avatar_url: 'https://avatars0.githubusercontent.com/u/7544036?v=4'
    },{
        login: 'brandondanh',
        github_id: 12474694,
        avatar_url: 'https://avatars1.githubusercontent.com/u/12474694?v=4',
    }
];

module.exports = () => {
    People.remove({}, (err, deleted) => {
        if (err) {
            console.log(err);
        } else {
            console.log('All people have been removed');
        }
    }).then(QueuedPerson.remove({}, (err, deleted) => {
        if (err) {
            console.log(err);
        } else {
            console.log('All people have been removed from queue');
        }
    })
).then( People.create(created, (err, people) => {
        if (err) {
            console.log(err);
        } else {
            console.log('People were created:');
            console.log(people);
        }
    })).then(QueuedPerson.create(created, (err, people) => {
        if (err) {
            console.log(err);
        } else {
            console.log('queuedPersons were created:');
            console.log(people);
        }
    })).then(console.log('Seed was invoked')); 
    



   

    

    
    
}