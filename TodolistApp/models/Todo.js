const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  title:{
    type: String,
    required:[true, `must provide Title`],
    trim: true,
    maxlength:[26, 'name cannot be more than 26 characters'],
  },
  completed:{
    type: Boolean,
    default:false
  }
})

module.exports = mongoose.model('Todo', TodoSchema)