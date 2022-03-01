const { getAsync, setAsync } = require('../redis/index');

const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);

  const stats = await getAsync('added_todos');
  if (stats) {
    setAsync('added_todos', Number(stats) + 1)
  } else {
    setAsync('added_todos', 1)
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  // update runtime object
  req.todo = await Todo.findByIdAndUpdate(
    req.todo._id,
    {
      text: req.body.text,
      done: req.body.done,
    },
    {
      new: true,
      omitUndefined: true
    }
  )

  // send updated object
  res.json(req.todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
