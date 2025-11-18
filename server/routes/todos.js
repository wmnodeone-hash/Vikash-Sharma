const router = require('express').Router();
const todoController = require('../controllers/todoController');
const auth = require('../middleware/auth');

router.route('/').get(auth, todoController.getTodos);

router.route('/add').post(auth, todoController.createTodo);

router.route('/:id').get(auth, todoController.getTodoById);

router.route('/:id').delete(auth, todoController.deleteTodo);

router.route('/update/:id').post(auth, todoController.updateTodo);

module.exports = router;
