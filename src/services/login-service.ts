import UserService from "./user-service";
import { User } from "../entities/user";
import { Credentials } from "../hooks/use-login";

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  // Try to define better types
  public async login(email: Credentials['email'], password: Credentials['password']): Promise<User> {
    if (!this.isValidEmail(email)) {
      throw new Error("Email is invalid");
    }

    const registeredUsers = await this.getRegisteredUsers()

    const user = registeredUsers.default.filter((u: User) => u.email === email && u.password === password)[0]

    if(!user) {
      throw new Error("User is not found");
    }

    const User = this.userService.getConstructorByRole(user.role)

    return User.from(user)
  }

  isValidEmail(email: Credentials['email']): email is Credentials['email'] {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    return regexp.test(email)
  }

  private getRegisteredUsers(): Promise<any> {
    return import("../mocks/users.json");
  }
}
