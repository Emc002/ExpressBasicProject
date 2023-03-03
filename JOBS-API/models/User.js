const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please input name"],
    minlength: [3, "Min 3 chracter"],
    maxlength: [50, "Max 50 chracter"],
  },
  email: {
    type: String,
    required: [true, "Please input email"],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please Input Valid Email"],
    unique:true,
  },
  password: {
    type: String,
    required: [true, "Please input password"],
    minlength: [8, "Min 8 chracter"],
  },

})

UserSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJwt = function () {
  return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

UserSchema.methods.comparePassword = async function (candPass) {
  const isMatch = await bcrypt.compare(candPass, this.password)
 return isMatch;
}
module.exports = mongoose.model('User', UserSchema)