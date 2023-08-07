const express = require('express');
const reviewRouter = express.Router();
const {getAllReviews,createReview,top3reviews,getPlanReviews,updateReview,deleteReview} = require('../controller/reviewController');
const {protectRoute} = require('../controller/authController');
const cookieParser = require('cookie-parser');
reviewRouter.use(cookieParser());

reviewRouter
.route('/all')
.get(getAllReviews);

reviewRouter
.route('/top3')
.get(top3reviews);

reviewRouter
.route('/:id')
.get(getPlanReviews)

reviewRouter.use(protectRoute);
reviewRouter
.route('/crud/:plan')
.post(createReview)
.patch(updateReview)
.delete(deleteReview);

module.exports = reviewRouter;