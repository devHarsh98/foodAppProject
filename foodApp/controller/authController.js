const userModel = require("../models/userModel");
const {sendMail} = require('../utility/nodemailer');
const jwt = require('jsonwebtoken');
const JWT_Key = 'sgy9w7t1278102ra';

module.exports.signup = async function signup(req,res) {
    try {
        let userData = req.body;
        let user = await userModel.create(userData);
        sendMail('signup',user);
        if(user) {
            return res.json({
                message : 'user signed up',
                data : user
            })
        }
        else {
            return res.json({
                message : 'error while signing up'
            })
        }
    }
    catch(err) {
        return res.json({
            message : err.message
        })
    }
}  

module.exports.login = async function login(req,res) {
    try {
        let data = req.body;
        if(data.email) {
            let user = await userModel.findOne({email : data.email});
            if(user) {
                if(user.password == data.password) {
                    let uid = user._id;
                    let token = jwt.sign({payload : uid}, JWT_Key);
                    res.cookie('login', token, {httpOnly : true});
                    return res.json({
                        message : 'user has logged in'
                    })
                }
                else {
                    return res.json({
                        message : 'wrong credentials'
                    })
                }
            }
            else {
                return res.json({
                    message : 'user not found'
                })
            }
        }
        else {
            return res.json({
                message : 'Please enter your email'
            })
        }
    }
    catch(err) {
        res.json({
            message : err.message
        })
    }
}  

module.exports.isAuthorized = function isAuthorized(roles) {     // roles = ['admin']
    return function(req,res,next) {
        if(roles.includes(req.role) == true) {
            next();
        }
        else {
            res.status(401).json({
                message : 'operations not allowed'
            })
        }
    }
}  

module.exports.protectRoute = async function protectRoute(req,res,next) {   
    try {
        let token;   
        console.log(req.cookies);
        if(req.cookies.login) {
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_Key);    // JWT (Verify) return payload = {payload : uid}
            console.log('Payload : ',payload);
            // Payload :  { payload: '64c3bcd2828c1ab973eaf31c', iat: 1690549495 }
            if(payload) {
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user._id;
                next();
            }
            else {
                return res.json({
                    message : 'please login again'
                })
            }
        }
        else {
            const client = req.get('User-Agent');
            // browser
            if(client.includes('Mozilla') == true) {
                return res.redirect('/login');
            }
            // Postman
            else {
                return res.json({
                    message : 'please login'
                })
            }
        }
    }
    catch(err) {
        return res.json({
            message : 'Hello ' + err.message
        })
    }
}     

module.exports.forgetPassword = async function forgetPassword(req,res) {
    let {email} = req.body;
    try  {
        let user = await userModel.findOne({email : email});
        if(user) {
            let resetToken = user.createResetToken();
            // http://abc.com/resetPassword/resetToken
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
            // send email to the user (nodemailer)
            let obj = {
                resetPasswordLink : resetPasswordLink,
                email : email
            }
            sendMail('resetpassword',obj);
            return res.json({
                message : 'please check your gmail'
            });
        }
        else {
            return res.json({ 
                message : 'please signup'
            })
        }
    }
    catch(err) {
        res.json({
            message : err.message
        })
    }
}

module.exports.resetPassword = async function resetPassword(req,res) {
    try {
        const token = req.params.token;
        let {newPassword, confirmPassword} = req.body;
        const user = await userModel.findOne({resetToken : token});
        if(user) {
            // resetPasswordHandler will update user's password in db
            user.resetPasswordHandler(newPassword,confirmPassword);
            await user.save();
            res.json({
                message : 'user password changed successfully please login again'
            })
        }
        else {
            return res.json({
                message : 'user not found'
            })
        }
    }
    catch(err) {
        res.json({
            message : err.message
        })
    }
}

module.exports.logout = function logout(req,res) {
    res.cookie('login',' ',{maxAge:1});               //ms
    res.json({
        message : 'user logged out successfully'
    })
}