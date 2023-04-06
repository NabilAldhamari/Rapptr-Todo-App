const { PrismaClient } = require('@prisma/client')
const Todo = require('../app/models/Todo');
const TodoRepository = require('../app/models/TodoRepository');
const crypto = require('crypto');

const User = require('../app/models/User');
const UserRepository = require('../app/models/UserRepository');

async function seedDatabase() {
  try {
    const todoRepository = new TodoRepository(new PrismaClient());

    const todo1 = new Todo({
      id: 1,
      title: 'Submit homework assignment for review!',
      description: 'Review code while waiting for feedback, proceed to feel bad about the bugs you missed!',
      completed: 0,
    });

    const todo2 = new Todo({
      id: 2,
      title: 'Upgrade the SAML-SP open-source project',
      description: 'Apply S.O.L.I.D principles and design patterns to make the library more robust.',
      completed: 0,
    });

    todoRepository.create(todo1).then(todo => {
      console.log("[+] Todo created successfully: " + todo.getTitle());
    }).catch(err => {
      console.log("[x] Error writing todo: " + err);
    });

    todoRepository.create(todo2).then(todo => {
      console.log("[+] Todo created successfully: " + todo.getTitle());
    }).catch(err => {
      console.log("[x] Error writing todo: " + err);
    });

    const userRepository = new UserRepository(new PrismaClient());
    const user1 = new User({
      id: 1,
      username: 'nabil',
      password: crypto.createHash('sha256').update("123123").digest('hex'),
    });

    userRepository.create(user1).then(user => {
      console.log("[+] User created successfully: " + user.getUsername());
    }).catch(err => {
      console.log("[x] Error writing user: " + err.messge);
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } 
}

seedDatabase();