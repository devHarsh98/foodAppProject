const express = require('express');
const bookingRouter = express.Router();
const { protectRoute } = require('../controller/authController');
const { createSession } = require('../controller/bookingController');
const cookieParser = require('cookie-parser');
bookingRouter.use(cookieParser());

bookingRouter.post('/createSession', protectRoute, createSession);
bookingRouter.get('/createSession', function (req, res) {
    res.sendFile('C:/foodAppProject/booking.html');
});
module.exports = bookingRouter;