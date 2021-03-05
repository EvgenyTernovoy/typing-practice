import UserService from "./user-service";
import { User } from "../entities/user";
import { Credentials } from "../hooks/use-login";

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  // Try to define better types
  public async login(email: Credentials['email'], password: Credentials['password']): Promise<User> {
    const registeredUsers = await this.getRegisteredUsers()

    const user = registeredUsers.default.filter((u: User) => u.email === email && u.password === password)[0]

    if(!user) {
      throw new Error("User not find");
    }

    const User = this.userService.getConstructorByRole(user.role)

    return User.from(user)
  }

  private getRegisteredUsers(): Promise<any> {
    return import("../mocks/users.json");
  }
}
