const Todo = require('./Todo');

class TodoRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  create(todo) {
    return new Promise(async (resolve, reject) => {
      const result = await this.prisma.todo.create({
        data: {
          title: todo.getTitle(),
          description: todo.getDescription(),
          completed: todo.isCompleted(),
          deleted: 0,
          createdAt: new Date()
        },
      });
      
      if (result) {
        resolve(new Todo(result));
      } else {
        reject(new Error("Todo was not persisted to the database!"));
      }
    });
  }

  findById(id) {
    return new Promise(async (resolve, reject) => {
      const result = await this.prisma.todo.findUnique({
        where: {
          id: parseInt(id),
        },
      });
  
      if (!result) {
        reject(new Error("Todo not found."));
      }
  
      resolve(new Todo(result));
    });
  }

  findAll() {
    return new Promise(async (resolve, reject) => {
      const results = await this.prisma.todo.findMany({
        where: {
          deleted: 0,
        },
      });
      
      if (!results) {
        reject(new Error("No todos were found in the database."));
      }

      resolve(results.map(result => new Todo(result)));
    });  
  }

  update(todo) {
    return new Promise(async(resolve, reject) => {
      const results = await this.prisma.todo.update({
        where: {
          id: todo.getId(),
        },
        data: {
          title: todo.getTitle(),
          description: todo.getDescription(),
          completed: todo.isCompleted(),
          updatedAt: new Date(),
          deleted: parseInt(todo.isDeleted())
        },
      });

      if (!results) {
        reject(new Error("There was an error while updating the todo."));
      }

      resolve(todo);
    });
  }

  delete(id) {
    return new Promise(async(resolve, reject) => {
      const results = await this.prisma.todo.update({
        where: {
          id: parseInt(id),
        },
        data: {
          deleted: 1,
          updatedAt: new Date()
        },
      });

      if (!results) {
        reject(new Error("Error while soft-deleting a todo!"));
      }

      resolve(true);
    });  
  }
}

module.exports = TodoRepository;
