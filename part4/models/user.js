const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
});
userSchema.plugin(uniqueValidator, { message: 'Error: username should be unique!' });

userSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj.passwordHash;
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;