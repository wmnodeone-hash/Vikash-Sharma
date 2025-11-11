const router = require('express').Router();
let Todo = require('../models/todo.js');
let User = require('../models/user.js');

router.route('/').get((req, res) => {
  Todo.find()
    .populate('user', 'username')
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  const { description, username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const newTodo = new Todo({
      description,
      user: user._id,
    });

    await newTodo.save();
    res.json('Todo added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').get((req, res) => {
  Todo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json('Todo deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      todo.description = req.body.description;
      todo.completed = req.body.completed;

      todo.save()
        .then(() => res.json('Todo updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
