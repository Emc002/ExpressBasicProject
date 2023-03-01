const express = require('express');
const router = express.Router();

const todoPackage  = require('../controllers/Task')

router.route('/').get(todoPackage.getAllTodo).post(todoPackage.createTodo)
router.route('/:id').get(todoPackage.getTodo).patch(todoPackage.updateTodo).delete(todoPackage.deleteTodo)
module.exports = router