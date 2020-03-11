import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import expressValidator from 'express-validator'
import fs from 'fs'
import cors from 'cors'


dotenv.config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
    console.log("db connected")
})
mongoose.connection.on('err', err=>{
    console.log(`DB connection erro: ${err.message}`)
})

const app = express();


import postRoutes from './routes/post'
import authRoutes from './routes/auth'
import userRoutes from './routes/user'



app.get('/',(req,res) => {
  fs.readFile('docs/apiDocs.json', (err,data) => {
if(err) {
  res.status(400).json({
    error: err
  });
}
const docs = JSON.parse(data);
res.json(docs);
  });
});


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(expressValidator());
app.use(cors())
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);


app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: 'Unauthorized!'});
    }
  });

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log("connected")
})