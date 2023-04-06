class User {
    constructor({ id, username, password }) {
      this.id = parseInt(id);
      this.username = username;
      this.password = password;
    }
  
    getId() {
      return this.id;
    }
  
    getUsername() {
      return this.username;
    }

    getPassword() {
      return this.password;
    }
  }

  module.exports = User;