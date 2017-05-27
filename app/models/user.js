
const mongoose = require('mongoose');
var userSchema = new mongoose.Schema(
    {
        name:'string',
        email:'string',
    },
    { 
        collection: 'user' 
    }    
);

module.exports = mongoose.model('user', userSchema);