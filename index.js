require('dotenv').config()
const express = require('express');
const dbConnect = require('./src/db/db');
const authRouter  = require('./src/routes/authRoute');
const { handleError, verifyJWT, cacheMiddleware, cacheInterceptor, invalidateInterceptor } = require('./src/middleware');
const bodyParser = require('body-parser');
const eventRouter = require('./src/routes/eventRoute');
const jwtStrategy = require('./src/strategy/jwt');
const passport = require('passport');
const userRouter = require('./src/routes/userRoute');
const newsRouter = require('./src/routes/newsRoute');
const { default: rateLimit } = require('express-rate-limit');
const { default: Redis } = require('ioredis');
const client = require('./src/redis');
const  cors  = require('cors');
const setupSwagger = require('./src/swagger');
const commentRoute = require('./src/routes/commentRoute');
const { createServer } = require('node:http');

const app = express();

app.use(cors())
const server = createServer(app, (req, res) => {
  const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Max-Age': 2592000, // 30 days
      /** add other headers as per requirement */
  }

  if (req.method === 'OPTIONS') {
      res.writeHead(204, headers)
      res.end()
      return
  }

  if (['GET', 'POST'].indexOf(req.method) > -1) {
      res.writeHead(200, headers)
      // console.log("Hello World")
      res.end('Hello World')
      return
  }

  res.writeHead(405, headers)
  res.end(`${req.method} is not allowed for the request.`)
});


//rate limit login
const loginLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10, // Limit each IP to 100 requests per windowMs
  message: ({msg:'Too many requests from this IP, please try again later.'})
})

dbConnect().catch((err) => {
    console.log(err.message)
  })

passport.use(jwtStrategy)
app.use(bodyParser.json())


app.use('/user', loginLimit, userRouter);
app.use('/auth',loginLimit, authRouter);
app.use('/event',eventRouter);
//redis
// app.use(cacheMiddleware)
// app.use(cacheInterceptor(30*60))
// app.use(invalidateInterceptor)
app.use('/news',newsRouter);
app.use('/comments', commentRoute)


app.use(handleError)
setupSwagger(app)

server.listen(process.env.PORT, (req, res)=>{
    console.log(`Server is running at port ${process.env.PORT}`);
});