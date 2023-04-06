# Simple Todo API Application

This is a simple todo API application written in Node.js as part of the hiring process for Rapptr Labs' backend engineer position.

The project was built to abide by the following requirements:
- Code that is clean and maintainable
- There is some type of design pattern followed (MVVM, etc)
- Solid understanding of Backend domain knowledge (navigation, state management, etc).

## Docker Environment

The environment is dockerized and consists of a MySQL service running alongside the todo-api service.

To run the environment, simply navigate to the project's folder after cloning it and execute `docker-compose up` in your favorite terminal.

## System Tests

If installing locally, make sure you install all the dependencies by running `npm install` first.

To run the unit tests for the project, simply run `npm test` after installing the required packages.

## System Usage

### Login:

POST http://localhost:8080/users/login
username: nabil
password: 123123

Use the authorization token for all subsequent requests in the Authorization header, for example:
Authorization: Bearer {token}


### User Endpoints (requires authentication):

- Fetch users:
  GET http://localhost:8080/users/

- Fetch a specific user:
  GET http://localhost:8080/users/{id}

### Todo Endpoints (requires authentication):

- Get a list of todos:
  GET `localhost:8080/todos`

- Get a specific todo:
  GET `localhost:8080/todos/{id}`

- Create a new todo:
  POST `localhost:8080/todos` with the following body parameters:
    - title
    - description
    - completed (1 or 0)

- Update an existing todo:
  PUT `localhost:8080/todos/{id}` with any of the following body parameters:
    - title
    - description
    - completed (1 or 0)
