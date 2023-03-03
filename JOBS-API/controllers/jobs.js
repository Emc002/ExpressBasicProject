const Jobs = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async (req,res) => {
  res.send("getAllJobs")
}
const getJobs = async (req,res) => {
  res.send("getJobs")
}
const createJobs = async (req,res) => {
  req.body.createdBy = req.user.userID
  const job = await Jobs.create(req.body)
  res.status(StatusCodes.CREATED).json({job})
}
const updateJobs = async (req,res) => {
  res.send("updateJobs")
}
const deleteJobs = async (req,res) => {
  res.send("deleteJobs")
}
  

  
  module.exports =  {
    getAllJobs,
    getJobs,
    createJobs,
    updateJobs,
    deleteJobs,
  }