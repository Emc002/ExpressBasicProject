const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const authencticationMiddleware = async (req,res,next) => {
  console.log(req.headers.authorization)
  next();
}


module.exports = authencticationMiddleware