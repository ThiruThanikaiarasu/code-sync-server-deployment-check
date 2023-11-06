require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3500

const mongoose = require('mongoose')

app.use(express.json())

const cors = require('cors')
app.use(cors())

const signupRouter = require('./routes/signinRoute')

mongoose.connect(process.env.DB_URI)
.then( () => {
    app.listen(PORT, console.log(`Database is Connected and Server is running at http://localhost:3500/api/v1`))
})
.catch( (error) => {
    console.log(error)
})

app.get('/', (request, response)=> {
    response.status(200).json({message:'CodeSync'})
})

app.use('/api/v1/signup', signupRouter)



