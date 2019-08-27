const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});
mongoose.model('User', UserSchema);

module.exports = UserSchema
