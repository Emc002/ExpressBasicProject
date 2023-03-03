const getAllJobs = async (req,res) => {
  res.send("getAllJobs")
}
const getJobs = async (req,res) => {
  res.send("getJobs")
}
const createJobs = async (req,res) => {
  res.send("createJobs")
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