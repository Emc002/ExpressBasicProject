const {UnauthencticatedError} = require('../errors')
const jwt = require('jsonwebtoken')

const authencticationMiddleware = async (req,res,next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new UnauthencticatedError('Not Authorized Request')
  }
  const token = authHeader.split(' ')[1];

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const {id, username} = decoded
    req.user = {id, username}
    next();
  }catch(err){
    throw new UnauthencticatedError('Not Authorized Request')
  }
}


module.exports = authencticationMiddleware