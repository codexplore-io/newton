const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.model('User');

async function validate(
    firstName = '',
    lastName = '',
    email = '',
    password = '',
    confirmPassword = ''
){
    let errors = [];
    if(firstName.length < 3){
        errors.push({
            code: 0,
            message: 'First name must be at least 3 characters.'
        });
    }
    if(lastName.length < 3){
        errors.push({
            code: 1,
            message: 'Last name must be at least 3 characters.'
        });
    }
    if(password.length < 8){
        errors.push({
            code: 3,
            message: 'Password must be at least 8 characters.'
        });
    }
    if(password !== confirmPassword){
        errors.push({
            code: 4,
            message: 'Passwords must match.'
        });
    }
    user = await User.find({email: email.toLowerCase()});
    if(user.length !== 0){
        errors.push({
            code: 6,
            message: 'Email must be unique.'
        });
    }

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.toLowerCase()) == false){
        errors.push({
            code: 7,
            message: 'Invalid e-mail'
        });
    }
    return errors;
}
// UserSchema.statics.validate = async function(){}
async function authenticate(
    username = false,
    email = false
){
    if(username){
        let user = await this.find({username: username});
    }else{
        let user = await this.find({email: email});
    }
    if(user.length == 0){
        return false;
    }
    return true;
}

async function createUser(
    username = '',
    email = '',
    password = '',
    firstName = '',
    lastName = ''
){
    let user = await this.create({
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    });
    bcrypt.hash(password, 10)
        .then(hashed_password => {
            password = hashed_password;
        })
}

// async function loginJWT(username){
//     if(!username || !password){
//         //error
//     }
// }

function login(user){
    session['userId'] = username.id;
}
function logout(user){
    session.clear();
}
// function logoutJWT(user){
//
// }

module.exports = {
    authenticate: authenticate,
    createUser: createUser,
    validate: validate,
    loginJWT: loginJWT,
    login: login,
    logout: logout
}
