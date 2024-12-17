import { UserDTO } from "../dto/user.dto.js";
import { userModel } from "./models/users.js";

class UserRepository {
  async getAll() {
    const users = await userModel.find();
    return users.map(user => new UserDTO(user));
  }

  async getById(id) {
    const user = await userModel.findById(id);
    return user ? new UserDTO(user) : null;
  }

  async getByEmail(email) {
    const user = await userModel.findOne({ email });
    return user ? new UserDTO(user) : null;
  }

  async create(data) {
    const userDTO = new UserDTO(data);
    const user = await userModel.create(userDTO);
    return new UserDTO(user);
  }

  async update(id, data) {
    const userDTO = new UserDTO(data);
    const userUpdate = await userModel.findByIdAndUpdate(id, userDTO, {
      new: true,
    });
    return userUpdate ? new UserDTO(userUpdate) : null;
  }

  async deleteOne(id) {
    const result = await userModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}

export const userRepository = new UserRepository();
