const TodoRepository = require('../app/models/TodoRepository');
const Todo = require('../app/models/Todo');
const { PrismaClient } = require('@prisma/client')

const prismaMock = new PrismaClient();
const todoRepository = new TodoRepository(prismaMock);

it("should create a new todo", async () => {
  const expectedTodo = {
    id: 1,title: "Test Todo", description: "This is a test todo", completed: 0, deleted: 0
  };
  
  prismaMock.todo.create = jest.fn((data) => {
    return Promise.resolve(
      expectedTodo
    );
  });

  const todo = new Todo({
    id: 1, title: "Test Todo", description: "This is a test todo", completed: 0
  });

  const createdTodo = await todoRepository.create(todo);
  expect(createdTodo).toEqual(expectedTodo);
});

it("read a list of todos", async () => {
  const expectedTodos = [
    { id: 1, title: "Update your resume", description: "test", completed: 0, deleted: 0},
    { id: 2, title: "Learn all about Prsima ORM", description: "test", completed: 0, deleted: 0 },
    { id: 3, title: "Revise my old Node.js notes", description: "test", completed: 1, deleted: 0 }
  ];
  
  prismaMock.todo.findMany = jest.fn((data) => {
    return Promise.resolve(
      expectedTodos
    );
  });

  const todoRepo = new TodoRepository(prismaMock);
  const todos = await todoRepo.findAll();

  expect(todos).toEqual(expect.arrayContaining(expectedTodos));
});

it("update a todo", async () => {
  const expectedTodo = new Todo({
    id: 1, title: "Update your resume", description: "test", completed: 0
  });

  const updatedTodo = new Todo({
    id: 1, title: "Update your resume and apply to Rapptr", description: "test", completed: 0
  });
  
  prismaMock.todo.update = jest.fn((data) => {
    return Promise.resolve(updatedTodo);
  });

  prismaMock.todo.findUnique = jest.fn((data) => {
    return expectedTodo;
  });

  const todoRepo = new TodoRepository(prismaMock);
  expectedTodo.updateTitle("Update your resume and apply to Rapptr");
  const result = await todoRepo.update(expectedTodo);

  expect(result).toEqual(updatedTodo);
});

it("update a non-existent todo", async () => {
  prismaMock.todo.findUnique = jest.fn((data) => {
    return Promise.reject(new Error("There was an error while updating the todo."));
  });

  const todoRepo = new TodoRepository(prismaMock);
  todoRepo.update(new Todo({id: 1, title: "test", description: "test", completed: 1})).catch(err => {
    expect(err).toEqual(new Error("Todo not found"));
  });
});

it("soft delete a todo", async () => {
  const storedTodo = new Todo({
    id: 1, title: "Update your resume", description: "test", completed: 0
  });

  const softDeletedTodo = new Todo({
    id: 1, title: "Update your resume", description: "test", completed: 0, deleted: 1
  });
  
  prismaMock.todo.findUnique = jest.fn((data) => {
    return storedTodo;
  });

  prismaMock.todo.update = jest.fn((data) => {
    return Promise.resolve(softDeletedTodo);
  });

  const todoRepo = new TodoRepository(prismaMock);
  storedTodo.delete();
  const result = await todoRepo.update(storedTodo);

  expect(result.isDeleted()).toEqual(1);
});
