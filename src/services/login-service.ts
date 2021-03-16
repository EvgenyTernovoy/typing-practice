import UserService from "./user-service";

import {User} from "../entities/user";
import {ValidEmail} from "../entities/valid-email";
import {ValidPassword} from "../entities/valid-password";

export default class LoginService {
  constructor(private readonly userService: UserService) {
  }

  // Try to define better types
  public async login(email: ValidEmail, password: ValidPassword): Promise<User> {
    return await this.userService.getCurrentUser(email, password)
  }
}
