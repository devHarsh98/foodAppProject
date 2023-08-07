const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const crypto = require('crypto');

// DataBase Connection
const db_link = 'mongodb+srv://admin:YnUFmbnt7xl4EnuR@cluster0.elhc2tu.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db) {
    console.log('user db connected');
})
.catch(function(err) {
    console.log(err);
})

// User Schema
const userSchema = mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validator : function() {
            return emailValidator.validate(this.email);
        }
    },
    password : {
        type : String,
        required : true,
        minLength : 8
    },
    confirmPassword : {
        type: String,
        // required : true,
        minLength : 8,
        validate : function() {
            return this.confirmPassword == this.password;
        }
    },
    role : {
        type: String,
        enum : ['admin','user','restaurantOwner','deliveryBoy'],
        default : 'user'
    },
    profileImage : {
        type: String,
        default : 'img/users/default.jpeg'
    },
    resetToken : {
        type: String
    }
});

// Pre-Hook
userSchema.pre('save', function() {
    this.confirmPassword = undefined;
})

// Attaching methods in mongoose schema
userSchema.methods.createResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');           // 32 bytes
    this.resetToken  = resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler = function(newPassword,confirmPassword) {
    this.password = newPassword;
    this.confirmPassword = confirmPassword;
    this.resetToken = undefined;
}

// User Model
let userModel = mongoose.model('userModel',userSchema);

module.exports = userModel;