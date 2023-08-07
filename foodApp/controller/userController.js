const userModel = require("../models/userModel");

module.exports.updateUser = async function updateUser(req,res) {
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;
        if(user) {
            let keys = Object.keys(dataToBeUpdated);    // return array of keys
            for(let i=0;i<keys.length;i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            await user.save();
            return res.json({
                message : 'data updated successfully',
                data : user
            })
        }
        else {
            return res.json({
                message : 'user not found'
            })
        }
    }
    catch(err) {
        return res.json({
            message : 'Hello ' + err.message
        })
    }
}  

module.exports.deleteUser = async function deleteUser(req,res) {
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if(!user) {
            return res.json({
                message : 'user not found'
            })
        }
        return res.json({
            message : 'user deleted successfully',
            data : user
        })
    }
    catch(err) {
        return res.json({
            message : err.message
        })
    }
}  

module.exports.getUser = async function getUser(req,res) {
    try {
        let id = req.id;
        let user = await userModel.findById(id);
        if(user) {
            return res.json({
                data : user
            });
        }
        else {
            return res.json({
                message : 'user not found'
            })
        }
    }
    catch(err) {
        return res.json({
            message : err.message
        })
    }
}  

module.exports.getAllUser = async function getAllUser(req,res) {
    try {
        let users = await userModel.find();
        if(users) {
            return res.json({
                message : 'user retrieved',
                data : users
            })  
        }
        else {
            return res.json({
                message : 'users not found'
            })
        }
    }
    catch(err) {
        return res.json({
            message : err.message
        })
    }
}  

module.exports.updateProfileImage = function updateProfileImage(req,res) {
    res.json({
        message : 'file upload successfully'
    })
}