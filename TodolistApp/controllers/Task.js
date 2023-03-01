const Todo = require('../models/Todo')
const asyncWrapper = require("../middleware/async")
const { createCustomError } = require('../errors/customErrors')

const todoPackage = {
  getAllTodo: asyncWrapper(async (req, res) => {
    const todo = await Todo.find({})
    res.status(200).json({ status: "SUCCESS", data: { todo, amount: todo.length } })
  }),

  createTodo: asyncWrapper(async (req, res) => {
    const todo = await Todo.create(req.body)
    res.status(201).json({ todo })
  }),

  getTodo: asyncWrapper(async (req, res) => {
    const ID = req.params.id
    const todo = await Todo.findOne({ _id: ID })
    if (!todo) {
      return next(createCustomError(`No Todo with id : ${ID}`, 404))
    }
    res.json({ todo })

  }),

  updateTodo: asyncWrapper(async (req, res) => {
    const ID = req.params.id
    const todo = await Todo.findOneAndUpdate({ _id: ID }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!todo) {
      return next(createCustomError(`No Todo with id : ${ID}`, 404))
    }
    res.status(200).json({ todo })

  }),

  deleteTodo: asyncWrapper(async (req, res) => {

    const ID = req.params.id
    const todo = await Todo.findOneAndDelete({ _id: ID })
    if (!todo) {
      return next(createCustomError(`No Todo with id : ${ID}`, 404))
    }
    res.status(200).json({ todo })
  })
}

module.exports = todoPackage;