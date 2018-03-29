const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    login: String,
    github_id: Number, 
    avatar_url: String, 

});

module.exports = mongoose.model('Person', personSchema);