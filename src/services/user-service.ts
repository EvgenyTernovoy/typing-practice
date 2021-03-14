import {Role} from "../entities/role";
import {Admin} from "../entities/admin";
import {Client} from "../entities/client";
import {Moderator} from "../entities/moderator";
import type {User} from "../entities/user";
import type {RoleToUser} from "../entities/role-to-user";
import {PrivilegedUser} from "../entities/privileged-user";
import {AVAILABLE_USER_OPERATIONS, AVAILABLE_USER_OPERATIONS_TYPE} from "../entities/available-user-operations";
import {ValidPassword} from "../entities/valid-password";
import { ValidEmail } from "../entities/valid-email";

export default class UserService {
  private users: readonly User[] = [];

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => {
      const User = this.getConstructorByRole(u.role);
      return User.from(u);
    });
    return this.users;
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async getCurrentUser(email: ValidEmail, password: ValidPassword): Promise<User> {
    const registeredUsers = await this.fetch()

    const user = registeredUsers.default.find((u: User) => u.email === email.value && u.password === password.value)

    if (!user) {
      throw new Error("User is not found");
    }

    const User = this.getConstructorByRole(user.role)

    return User.from(user)
  }

  async updateUserRole<R extends Role>(
    user: Readonly<RoleToUser[R]>,
    newRole: R
  ) {
    const User = this.getConstructorByRole(newRole);
    this.users = this.users.map((u) => (u.id === user.id ? User.from(u) : u));
    return this.users;
  }

  getAvailableOperations<
    U1 extends User,
    U2 extends PrivilegedUser ,
    >(user: U1, currentUser: U2) {
    return AVAILABLE_USER_OPERATIONS[currentUser.role][user.role] as AVAILABLE_USER_OPERATIONS_TYPE[U2["role"]][U1["role"]];
  }

  getConstructorByRole(role: Role) {
    switch (role) {
      case Role.ADMIN:
        return Admin;
      case Role.CLIENT:
        return Client;
      case Role.MODERATOR:
        return Moderator;
    }
  }
}
