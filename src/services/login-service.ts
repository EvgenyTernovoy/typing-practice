import UserService from "./user-service";

import {User} from "../entities/user";
import type {ValidEmail} from "../entities/valid-email";
import type {ValidPassword} from "../entities/valid-password";

export default class LoginService {
  constructor(private readonly userService: UserService) {
  }

  // Try to define better types
  public async login(email: ValidEmail, password: ValidPassword): Promise<User> {

    const registeredUsers = await this.getRegisteredUsers()

    const user = registeredUsers.default.filter((u: User) => u.email === email.value && u.password === password.value)[0]

    if (!user) {
      throw new Error("User is not found");
    }

    const User = this.userService.getConstructorByRole(user.role)

    return User.from(user)
  }

  private getRegisteredUsers(): Promise<any> {
    return import("../mocks/users.json");
  }
}
