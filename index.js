require('dotenv').config()
const express = require('express');
const dbConnect = require('./src/db/db');
const { authRouter } = require('./src/routes/authRoute');
const { handleError, verifyJWT } = require('./src/middleware');
const bodyParser = require('body-parser');
const eventRouter = require('./src/routes/eventRoute');
const jwtStrategy = require('./src/strategy/jwt');
const passport = require('passport');
const userRouter = require('./src/routes/userRoute');

const app = express();



dbConnect().catch((err) => {
    console.log(err.message)
  })

passport.use(jwtStrategy)
app.use(bodyParser.json())


app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/event',verifyJWT, eventRouter);


app.use(handleError)

app.listen(process.env.PORT, (req, res)=>{
    console.log(`Server is running at port ${process.env.PORT}`);
});