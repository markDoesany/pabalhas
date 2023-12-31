require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')


//express app
const app = express()

//middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next)=>{
  console.log(req.path, req.method)
  next()
})

//router
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)


//Connct to the database
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
      //listen for request
      app.listen(process.env.PORT, ()=>{
        console.log('Connected to db and listening on port', process.env.PORT)
      })
  })
  .catch((error)=>{
    console.log(error)
  })
