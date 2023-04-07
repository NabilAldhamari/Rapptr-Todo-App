# Simple Todo API Application

This is a simple todo API application written in Node.js as part of the hiring process for Rapptr Labs' backend engineer position.
The project was built to abide by the following requirements:
- Code that is clean and maintainable
- There is some type of design pattern followed (MVVM, etc)
- Solid understanding of Backend domain knowledge (navigation, state management, etc).

## Docker Environment
The environment is dockerized and consists of a MySQL service running alongside the todo-api service. To run the environment, follow these steps:
1. Clone the repository to your local machine.
2. Navigate to the project folder.
3. Run `docker-compose up` in your favorite terminal.

## System Tests

If installing locally, make sure you install all the dependencies by running `npm install` first.

To run the unit tests for the project, simply run `npm test` after installing the required packages.

## System Usage
If you're running the service locally then make sure to run the entry script `node server.js`. if you're using the docker environment this should be your entry script by default.
### 1. Login
To login you need to send a 
`POST http://localhost:8888/users/login` request and retrieve the `token` on a successful login, then use the authorization token for all subsequent requests in the Authorization header, for example:
`Authorization: Bearer {token}`.

#### 1.1 Default credentials:
- username: `nabil`
- password: `123123`



### 2. User Endpoints (requires authentication):

- Fetch users:
  `GET http://localhost:8888/users/`

- Fetch a specific user:
  `GET http://localhost:8888/users/{id}`

### 3. Todo Endpoints (requires authentication):
- Get a list of todos:
  `GET http://localhost:8888/todos`
- Get a specific todo:
  `GET http://localhost:8888/todos/{id}`
- Create a new todo:
  `POST http://localhost:8888/todos` with the following body parameters:

  | Field       	| Type   	| Values 	|
|-------------	|--------	|--------	|
| title       	| string 	|        	|
| description 	| string 	|        	|
| completed   	| int    	| [0,1]  	|


- Update an existing todo:
  `PUT http://localhost:8888/todos/{id}` with **ANY** of the following body parameters:

  | Field       	| Type   	| Values 	|
|-------------	|--------	|--------	|
| title       	| string 	|        	|
| description 	| string 	|        	|
| completed   	| int    	| [0,1]  	|
| deleted     	| int    	| [0,1]  	|

- Delete a specific todo:
  `DEL http://localhost:8888/todos/{id}`
