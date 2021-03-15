import UserService from "./user-service";

import {User} from "../entities/user";
import { ValidCredentials } from "../entities/valid-credentials";

export default class LoginService {
  constructor(private readonly userService: UserService) {
  }

  // Try to define better types
  public async login(email: ValidCredentials['email'], password: ValidCredentials['password']): Promise<User> {
    return await this.userService.getCurrentUser(email, password)
  }
}
