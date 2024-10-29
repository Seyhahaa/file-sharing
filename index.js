require('dotenv').config()
const express = require('express');
const dbConnect = require('./db/db');
const { authRouter } = require('./routes/authRoute');
const { handleError } = require('./middleware');
const bodyParser = require('body-parser');

const app = express();



dbConnect().catch((err) => {
    console.log(err.message)
  })

app.use(bodyParser.json())


app.use('/auth', authRouter);


app.use(handleError)

app.listen(process.env.PORT, (req, res)=>{
    console.log(`Server is running at port ${process.env.PORT}`);
});