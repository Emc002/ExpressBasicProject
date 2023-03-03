const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJwt();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const{email, password} = req.body

  if(!email || !password)
  {
    throw new BadRequestError("Please Input Email and Password")
  }
  const user = await User.findOne({email})
  
}

module.exports = {
  register,
  login
}