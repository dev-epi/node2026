const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
//path +method

mongoose.connect(process.env.DB)
.then(()=>{
    console.log('MongoDB connected')
}).catch((err)=>{
    console.log('Connection failed')
})

app.use('/' , require('./routes/index.routes'))
app.use('/users' , require('./routes/users.routes'))
app.use('/tasks' , require('./routes/tasks.routes'))
app.listen(process.env.PORT , ()=>{
    console.log('Server run on '+process.env.PORT)
})