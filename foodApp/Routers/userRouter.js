const express = require('express');
const userRouter = express.Router();
const multer = require('multer');
const {updateUser,deleteUser,getUser,getAllUser, updateProfileImage}= require('../controller/userController');
const {signup,login,isAuthorized,protectRoute,forgetPassword,resetPassword,logout} = require('../controller/authController');
const cookieParser = require('cookie-parser');
userRouter.use(cookieParser());

// User Options
userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)

// multer for file upload
const multerStorage = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null,'C:/foodAppProject/foodApp/public/images');
    },
    filename : function(req,file,cb) {
        cb(null,`user-${Date.now()}.jpeg`);
    }
})

const filter = function(req,file,cb) {
    if(file.mimetype.startsWith("image")) {
        cb(null,true);
    }
    else {
        cb(new Error("Not an Image! Please upload an image"), false);
    }
}

const upload = multer({
    storage : multerStorage,
    fileFilter : filter
})


userRouter.post('/ProfileImage', upload.single('photo'), updateProfileImage);
userRouter.get('/ProfileImage', function(req,res) {
    res.sendFile('C:/foodAppProject/multer.html')
})

userRouter
.route('/forgetPassword')
.post(forgetPassword);

userRouter
.route('/resetPassword/:token')
.post(resetPassword);

userRouter.use(protectRoute);             // Middleware
userRouter
.route('/:id')
.patch(updateUser)
.delete(deleteUser);

// Profile Page
// userRouter
// .route('/userProfile')
// .get(getUser); 

// userRouter
// .route('/forgetPassword')
// .post(forgetPassword);

// userRouter
// .route('/resetPassword/:token')
// .post(resetPassword);

userRouter
.route('/logout')
.get(logout)

// Admin Specific Function
userRouter.use(isAuthorized(['admin']));
userRouter
.route('/')
.get(getAllUser);

module.exports = userRouter;