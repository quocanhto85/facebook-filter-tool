const Joi = require('joi');
const mongoose = require('mongoose');
const url = `mongodb://test01:${encodeURIComponent('a@123456')}@103.74.122.87:27000`;

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) throw err;
});

const User = mongoose.model('User', new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 40
    },

    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    
    role: {
        type: String,
        default: 'basic',
        enum: ['basic', 'supervisor', 'admin']
    },

    accessToken: {
        type: String,
        minlength: 5,
        maxlength: 50
    }
}));

function validateUser(user) {
   const schema = {
     email: Joi.string().min(10).max(40).required(),
     password: Joi.string().min(5).max(50).required(),
     accessToken: Joi.string().min(5).max(50).required()
   }; 
   return Joi.validate(user, schema);
}

module.exports = User;
module.exports = validateUser;
