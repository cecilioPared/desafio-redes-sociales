import UserModel from '../models/user.js'

class UserController {
  static create(data) {
    return UserModel.create(data)
  }

  static get(query = {}) {
    return UserModel.find(query)
  }

}

export default UserController