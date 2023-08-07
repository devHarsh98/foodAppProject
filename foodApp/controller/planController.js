const planModel = require('../models/planModel');

module.exports.getAllPlans = async function getAllPlans(req,res) {
    try {
        let plans = await planModel.find();
        if(plans)  {
            return res.json({
                message : 'all plans retrieved',
                data : plans
            })
        }
        else {
            return res.json({
                message : 'plans not found'
            })
        }
    }
    catch(err) {
        res.status(500).json({
            message : err.message
        })
    }
}

module.exports.getPlan = async function getPlan(req,res) {
    try{
        let id = req.params.id;
        let plan = await planModel.findById(id);
        if(plan) {
            return res.json({
                message : 'plan retrieved',
                data : plan
            })
        } 
        else {
            return res.json({
                message : 'plan not found'
            })
        }
    }
    catch(err) {
        res.status(500).json({
            message : err.message
        })
    }
}

module.exports.createPlan = async function createPlan(req,res) {
    try {
        let planData = req.body;
        let plan = await planModel.create(planData);
        return res.json({
            message : 'plan created successfully',
            data : plan
        })
    }
    catch(err) {
        res.status(500).json({
            message : err.message
        })
    }
}

module.exports.deletePlan = async function deletePlan(req,res) {
    try {
        let id = req.params.id;
        let deletePlan = await planModel.findByIdAndDelete(id);
        return res.json({
            message : 'plan deleted successfully',
            data : deletePlan
        })
    }
    catch(err) {
        res.status(500).json({
            message : err.message
        })
    }
}

module.exports.updatePlan = async function updatePlan(req,res) {
    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);
        let dataToBeUpdated = req.body;
        if(plan) {
            // Update the plan object with the new values
            Object.keys(dataToBeUpdated).forEach(key => {     // return array of keys
                plan[key] = dataToBeUpdated[key];
            });
            // doc
            await plan.save();
            return res.json({
                message : 'plan updated successfully',
                data : plan
            })
        }
        else {
            return res.json({
                message : 'plan not found'
            })
        }
    }
    catch(err) {
        res.status(500).json({
            message : err.message
        })
    }
}

module.exports.top3Plans = async function top3Plans(req,res) {
    try {
        const plans = await planModel.find().sort({ratingsAverage : -1}).limit(3);
        res.json({
            message : 'top 3 plans',
            data : plans
        })
    }
    catch(err) {
        res.status(500).json({
            message : err.message
        })
    }
}