const UserRepository = require('../app/models/UserRepository');
const User = require('../app/models/User');
const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto');
const prismaMock = new PrismaClient();

it("login with a username and password", async () => {
  const user = { id: 1, username: "admin", password: "password123" };
  
  prismaMock.user.findFirst = jest.fn((data) => {
    return Promise.resolve(
      { id: 1, username: "admin", password: crypto.createHash('sha256').update(user.password).digest('hex') }
    );
  });

  const userRepo = new UserRepository(prismaMock);
  const loggedUser = await userRepo.findByUserByUsernameAndPassword(user.username, user.password);

  expect(loggedUser.username).toEqual(user.username);
});


it("read a list of users", async () => {
  const expectedUsers = [
    { id: 1, username: "admin", password: "long_Hash1" },
    { id: 2, username: "dinosaur", password: "rawr" },
  ];
  
  prismaMock.user.findMany = jest.fn((data) => {
    return Promise.resolve(
      expectedUsers
    );
  });

  const userRepo = new UserRepository(prismaMock);
  const users = await userRepo.findAllUsers();

  expect(users).toEqual(expect.arrayContaining(expectedUsers));
});

