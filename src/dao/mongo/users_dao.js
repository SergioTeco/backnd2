import { userModel } from "./models/users.js";
import { UserDTO } from "../dto/user.dto.js"; // Importamos el DTO

class UserDao {
  async getAll() {
    const users = await userModel.find();
    // Transformamos los documentos de la base de datos en DTOs
    return users.map(user => new UserDTO(user));
  }

  async getById(id) {
    const user = await userModel.findById(id);
    // Retornamos el dato en formato DTO si existe
    return user ? new UserDTO(user) : null;
  }

  async getByEmail(email) {
    const user = await userModel.findOne({ email });
    // Retornamos el dato en formato DTO si existe
    return user ? new UserDTO(user) : null;
  }

  async create(data) {
    // Aseguramos que los datos a crear estén alineados con el DTO
    const userDTO = new UserDTO(data);
    const user = await userModel.create(userDTO);
    return new UserDTO(user);
  }

  async update(id, data) {
    // Preparamos el DTO para la actualización
    const userDTO = new UserDTO(data);
    const userUpdate = await userModel.findByIdAndUpdate(id, userDTO, {
      new: true,
    });
    return userUpdate ? new UserDTO(userUpdate) : null;
  }

  async deleteOne(id) {
    const result = await userModel.deleteOne({ _id: id });
    return result.deletedCount > 0; // Indicamos si se eliminó con éxito
  }
}

export const userDao = new UserDao();