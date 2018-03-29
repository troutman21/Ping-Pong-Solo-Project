const mongoose = require('mongoose');

const queuedPersonSchema = new mongoose.Schema({
    login: String,
    github_id: Number, 
    avatar_url: String, 

});

module.exports = mongoose.model('queuedPerson', queuedPersonSchema);