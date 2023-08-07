const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('server is listening on port 3000');
})

app.use(express.json());

const userRouter = require('./foodApp/Routers/userRouter');
const planRouter = require('./foodApp/Routers/planRouter');
const reviewRouter = require('./foodApp/Routers/reviewRouter');
const bookingRouter = require('./foodApp/Routers/bookingRouter');

// base url, router to use
app.use('/user',userRouter);
app.use('/plans',planRouter);
app.use('/review',reviewRouter);
app.use('/booking',bookingRouter);

const planModel = require('./foodApp/models/planModel');