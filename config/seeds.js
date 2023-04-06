const { PrismaClient } = require('@prisma/client')
const Todo = require('../app/models/Todo');
const TodoRepository = require('../app/models/TodoRepository');

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

    await todoRepository.create(todo1).then(todo => {
      console.log("[+] Todo created successfully: " + todo.getTitle());
    }).catch(err => {
      console.log("[x] Error writing todo: " + err);
    });

    await todoRepository.create(todo2).then(todo => {
      console.log("[+] Todo created successfully: " + todo.getTitle());
    }).catch(err => {
      console.log("[x] Error writing todo: " + err);
    });

    const userRepository = new UserRepository(new PrismaClient());
    const user = new User({
      id: 1,
      username: 'nabil',
      password: '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e',
    });

    await userRepository.create(user).then(todo => {
      console.log("[+] User created successfully: " + user.getUsername());
    }).catch(err => {
      console.log("[x] Error writing todo: " + err);
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } 
}

seedDatabase();