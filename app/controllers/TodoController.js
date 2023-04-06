const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const Todo = require('../models/Todo');
const TodoRepository = require('../models/TodoRepository');

const todoRepository = new TodoRepository(new PrismaClient());

// Add a Todo
router.post('/', (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    completed: parseInt(req.body.completed) || 0
  });

  todoRepository.create(todo).then(todo => {
    res.status(201).json(todo);
  }).catch(err => {
    res.status(404).json({ message: err.message });
  });
});

// Change a Todo
router.put('/:id', async (req, res) => {
  todoRepository.findById(req.params.id).then(todo => {
    if (req.body.title) {
      todo.title = req.body.title;
    }

    if (req.body.description) {
      todo.description = req.body.description;
    }

    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }

    if (req.body.deleted !== undefined) {
      todo.deleted = parseInt(req.body.deleted);
    }

    todoRepository.update(todo).then(updatedTodo => {
      res.status(201).json(updatedTodo);
    }).catch(err => {
      res.status(500).json({ message: err.message });
    });

  }).catch(err => {
    res.status(404).json({ message: err.message });
  });
});

// Delete a todo (do a soft delete)
router.delete('/:id', async (req, res) => {
  todoRepository.findById(req.params.id).then(todo => {
    todoRepository.delete(todo.getId()).then(success => {
      if (success) {
        res.json({ message: 'Todo deleted.' });
      }
    }).catch(err => {
      res.status(500).json({ message: err.message });
    });
  }).catch(err => {
    res.status(404).json({ message: err.message });
  });
});

// List all todos
router.get('/', async (req, res) => {
  todoRepository.findAll().then(todos => {
    res.json(todos);
  }).catch(err => {
    res.status(404).json({ message: err.message });
  });
});

// Return a todo
router.get('/:id', async (req, res) => {
  todoRepository.findById(req.params.id).then(todo => {
    res.json(todo);
  }).catch(err => {
    return res.status(404).json({ message: err.message });
  });
});

module.exports = router;