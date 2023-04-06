const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const User = require('../models/User');
const UserRepository = require('../models/UserRepository');
const userRepository = new UserRepository(new PrismaClient());
const authenticationMiddleware = require('../middleware/jwtauth');
const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.JWT_TOKEN_SECRET;

router.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
  
    userRepository.findByUserByUsernameAndPassword(user.getUsername(), user.getPassword()).then(user => {
        const token = jwt.sign({ username: user.username,  role: "api_user" }, accessTokenSecret);
        res.status(201).json({success: true, token: token});
    }).catch(err => {
        res.status(401).json({ message: err.message });
    });
});

router.get('/', authenticationMiddleware, (req, res) => {
    userRepository.findAllUsers().then(users => {
        res.status(201).json(removePassword(users));
    }).catch(err => {
        res.status(404).json({ message: err.message });
    });
});

router.get('/:id', authenticationMiddleware, (req, res) => {
    userRepository.findByUserId(req.params.id).then(user => {
        res.status(201).json(removePassword(user));
    }).catch(err => {
        res.status(404).json({ message: err.message });
    });
});

function removePassword(data) {
    if (Array.isArray(data)) {
        return data.map((item) => {
        const { password, ...rest } = item;
        return rest;
        });
    } else {
        const { password, ...rest } = data;
        return rest;
    }
}

module.exports = router;