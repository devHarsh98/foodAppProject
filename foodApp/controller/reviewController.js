const planModel = require('../models/planModel');
const reviewModel = require('../models/reviewModel');

module.exports.getAllReviews = async function getAllReviews(req,res) {
    try {
        let reviews = await reviewModel.find();
        if(reviews) {
            return res.json({
                message : 'reviews retrieved',
                data : reviews
            })
        }
        else {
            return res.json({
                message : 'review not found'
            })
        }
    }
    catch(err) {
        res.json({
            message : err.message
        })
    }  
}

module.exports.top3reviews = async function top3reviews(req,res) {
    try {
        const reviews = await reviewModel.find().sort({rating : -1}).limit(3);
        if(reviews) {
            return res.json({
                message : 'top 3 reviews retrieved',
                data : reviews
            })
        }
        else {
            return res.json({
                message : 'review not found'
            })
        }
    }
    catch(err) {
        res.json({
            message : err.message
        })
    }  
}

module.exports.getPlanReviews = async function getPlanReviews(req,res) {
    try {
        let planId = req.params.id;
        let reviews = await reviewModel.find();
        reviews = reviews.filter(review => review.plan._id == planId);   // Particular plan (reviews)
        if(reviews) {
            return res.json({
                message : 'reviews retrieved for a particular plan successfully',
                data : reviews
            })
        }
        else {
            return res.json({
                message : 'review not found'
            })
        }
    }
    catch(err) {
        res.json({
            message : err.message
        })
    }  
}

module.exports.createReview = async function createReview(req,res) {
    try {
        let planId = req.params.plan;
        let plan = await planModel.findById(planId);
        let review = await reviewModel.create(req.body);
        plan.ratingsAverage = (plan.ratingsAverage + req.body.rating) / 2;
        await plan.save();
        res.json({
            message : 'review created',
            data : review
        })
    }
    catch(err) {
        res.json({
            message : err.message
        })
    }
}

module.exports.updateReview = async function updateReview(req, res) {
    try {
        let reviewId = req.body.id;
        let dataToBeUpdated = req.body;
        let keys = Object.keys(dataToBeUpdated);   // Get the keys from dataToBeUpdated
       
        keys = keys.filter(key => key !== 'id');    // Filter out the 'id' key

        let review = await reviewModel.findById(reviewId);
        if (review) {
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                review[key] = dataToBeUpdated[key];
            }
            await review.save();
            return res.json({
                message: 'review updated successfully',
                data: review
            });
        } else {
            return res.json({
                message: 'review not found'
            });
        }
    } catch (err) {
        res.json({
            message: err.message
        });
    }
}

module.exports.deleteReview = async function deleteReview(req,res) {
    try {
        let reviewId = req.body.id;
        let review = await reviewModel.findByIdAndDelete(reviewId);
        if(!review) {
            return res.json({
                message : 'review not found'
            })
        } 
        return res.json({
            message : 'review deleted successfully',
        })
    }
    catch(err) {
        res.json({
            message : err.message
        })
    }
}