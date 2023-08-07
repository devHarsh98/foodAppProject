const mongoose = require('mongoose');
const db_link = 'mongodb+srv://admin:YnUFmbnt7xl4EnuR@cluster0.elhc2tu.mongodb.net/?retryWrites=true&w=majority';

// DataBase Connection
mongoose.connect(db_link)
.then((db) => {
    console.log('plan db connected')
})
.catch((err) => {
    console.log(err);
})

// Plan Schema
let planSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
        maxLength: [20, 'plan name should not exceed more than 20 characters']
    },
    duration : {
        type: Number,
        required: true
    },
    price : {
        type: Number,
        required: [true,'price not entered']
    },
    ratingsAverage : {
        type: Number
    },
    discount : {
        type: Number,
        validate: [function() {
            this.discount < 100
        },'discount should not exceed price']
    }
})

// Plan Model
let planModel = mongoose.model('planModel',planSchema);

// (async function createPlan() {
//     let planObject = {
//         name : 'Super Meal',
//         duration : 30,
//         price : 1000,
//         ratingsAverage : 4.5,
//         discount : 20
//     }
//     let data = await planModel.create(planObject);
//     console.log(data);
// })();

module.exports = planModel;