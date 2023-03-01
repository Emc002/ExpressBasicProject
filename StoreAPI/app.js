require('dotenv').config()
// async error
require('express-async-errors')


const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const productsRouter = require('./routes/products')
// middleware
app.use(express.json())


//routes

app.get('/', (req,res)=>{
  res.send(`<h1>STORE API </h1><a href="/api/v1/products">Product route</a>`)
})

app.use('/api/v1/products', productsRouter)

// product routes
const port = process.env.PORT || 3000
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const starting = async () =>{
  try{
    //connect DB
    connectDB(process.env.DB_CONNECTION)
    app.listen(port, console.log(`Server is listening on PORT ${port}......`))
  }catch(err){
    console.log(err)
  }
}

starting();