class Todo {
    constructor({ id, title, description, completed, deleted }) {
      this.id = parseInt(id);
      this.title = title;
      this.description = description;
      this.completed = parseInt(completed);
      this.deleted = parseInt(deleted) || 0;
    }
  
    getId() {
      return this.id;
    }
  
    getTitle() {
      return this.title;
    }
  
    updateTitle(title) {
      this.title = title;
    }

    getDescription() {
      return this.description;
    }

    updateDescription(description) {
      this.description = description;
    }
  
    isCompleted() {
      return parseInt(this.completed);
    }

    isDeleted() {
      return parseInt(this.deleted);
    }

    delete() {
      this.deleted = 1;
    }
  }

  module.exports = Todo;