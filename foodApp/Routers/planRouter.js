const express = require('express');
const planRouter = express.Router();
const {protectRoute,isAuthorized} = require('../controller/authController');
const {getAllPlans,getPlan,createPlan,updatePlan,deletePlan,top3Plans} = require('../controller/planController');
const cookieParser = require('cookie-parser');
planRouter.use(cookieParser());

planRouter
.route('/allPlans')
.get(getAllPlans);

// own plan : logged in necessary
planRouter.use(protectRoute);
planRouter
.route('/plan/:id')
.get(getPlan)

// admin and restaurant owner can create,update or delete plans
planRouter.use(isAuthorized(['admin','restaurantOwner']));
planRouter
.route('/crudPlan')
.post(createPlan)

planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)

planRouter
.route('/top3Plans')
.get(top3Plans)

module.exports = planRouter;