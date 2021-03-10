import UserService from "./user-service";
import { User } from "../entities/user";
import { Credentials } from "../hooks/use-login";
import {ValidatedEmail, ValidatedPassword} from "../entities/validated-credentials";

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  // Try to define better types
  public async login(email: ValidatedEmail | null, password: ValidatedPassword | null): Promise<User> {
    if (!email || !password) {
      throw new TypeError("Credentials is invalid");
    }

    const registeredUsers = await this.getRegisteredUsers()

    const user = registeredUsers.default.filter((u: User) => u.email === email && u.password === password)[0]

    if(!user) {
      throw new Error("User is not found");
    }

    const User = this.userService.getConstructorByRole(user.role)

    return User.from(user)
  }

  validateEmail(email: Credentials['email']): ValidatedEmail | null {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if(!regexp.test(email)) {
      return null
    }

    return email as ValidatedEmail
  }

  validatePassword(password: Credentials['password']): ValidatedPassword | null {
    if(!password) {
      return null
    }

    return password as ValidatedPassword
  }

  private getRegisteredUsers(): Promise<any> {
    return import("../mocks/users.json");
  }
}
