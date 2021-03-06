import {Role} from "../entities/role";
import {Admin} from "../entities/admin";
import {Client} from "../entities/client";
import {Moderator} from "../entities/moderator";
import {Operation} from "../entities/operation";
import type {User} from "../entities/user";
import type {RoleToUser} from "../entities/role-to-user";
import {AVAILABLE_USER_OPERATIONS} from "../entities/available-user-operations";
import type {AVAILABLE_USER_OPERATIONS_TYPE} from '../entities/available-user-operations-type'

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

  async updateUserRole<R extends Role>(
    user: Readonly<RoleToUser[R]>,
    newRole: R
  ) {
    const User = this.getConstructorByRole(newRole);
    this.users = this.users.map((u) => (u.id === user.id ? User.from(u) : u));
    return this.users;
  }

  getAvailableOperations(user: User, currentUser: User | null):  readonly Operation[] {
    // Вам нужно поменять логику внутри getAvailableOperations для того, что бы это работало с логином
    if (!currentUser) {
      return []
    }

    return this.getAvailableOperationsByUserRole(user.role, currentUser.role)
  }

  getAvailableOperationsByUserRole<R extends Role, CR extends Role>(userRole: R, currentUserRole: CR): AVAILABLE_USER_OPERATIONS_TYPE[CR][R] {
    return AVAILABLE_USER_OPERATIONS[currentUserRole][userRole]
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
