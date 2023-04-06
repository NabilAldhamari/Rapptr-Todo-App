const User = require('./User');
const crypto = require('crypto');

class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  create(user) {
    return new Promise(async (resolve, reject) => {
      const result = await this.prisma.user.create({
        data: {
          username: user.getUsername(),
          password: user.getPassword(),
        },
      });
      
      if (result) {
        resolve(new User(result));
      } else {
        reject(new Error("User was not persisted to the database!"));
      }
    });
  }

  findByUserId(id) {
    return new Promise(async (resolve, reject) => {
      const result = await this.prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });
  
      if (!result) {
        reject(new Error("User was not found."));
      }
  
      resolve(new User(result));
    });
  }

  findByUserByUsernameAndPassword(username, password) {
    return new Promise(async (resolve, reject) => {
      const result = await this.prisma.user.findFirst({
        where: {
          username: username,
        },
      });
  
      if (!result) {
        reject(new Error("User was not found."));
      }
      
      const passwordMatch = (crypto.createHash('sha256').update(password).digest('hex') === result.password);
  
      if (!passwordMatch) {
        reject(new Error("Invalid password."));
      }

      resolve(new User(result));
    });
  }

  findAllUsers() {
    return new Promise(async (resolve, reject) => {
      const results = await this.prisma.user.findMany();
      
      if (!results) {
        reject(new Error("No users were found in the database."));
      }

      resolve(results.map(result => new User(result)));
    });  
  }
}

module.exports = UserRepository;
