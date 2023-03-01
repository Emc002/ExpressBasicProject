const express = require('express');
const app = express();
const todo = require('./routes/todo')
const connectDB = require('./DB/connect')
const notFound = require('./middleware/notFound')
// const errorHandlerMiddleware = require('./middleware/errorHandler')
require('dotenv').config();

//middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/todo', todo)
app.use(notFound)
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errorMessages = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({ message: errorMessages.join(', ') });
  }
  return res.status(500).json({ message: err.message });
});
// app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const starting = async () =>{
  try{
    await connectDB(process.env.DB_CONNECTION);
    app.listen(port, console.log(`Server is Listening on port ${port}.... `))
  }catch(err){
    console.log(err)
  }
}
starting();
