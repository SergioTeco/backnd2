class UserDTO {
    constructor(user) {
      this.id = user._id; // MongoDB usa _id como identificador
      this.firstName = user.first_name;
      this.lastName = user.last_name;
      this.email = user.email;
      this.age = user.age;
    }
  }
  
  module.exports = UserDTO;
  