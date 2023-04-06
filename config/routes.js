const express = require('express');
const { todoController, userController } = require('../app/controllers');
const authenticationMiddleware = require('../app/middleware/jwtauth');

const router = express.Router();

router.use('/todos', authenticationMiddleware, todoController);
router.use('/users', userController);

module.exports = router;