import {Role} from "../entities/role";
import {Admin} from "../entities/admin";
import {Client} from "../entities/client";
import {Moderator} from "../entities/moderator";
import {Operation} from "../entities/operation";
import type {User} from "../entities/user";
import type {RoleToUser} from "../entities/role-to-user";
import {AVAILABLE_USER_OPERATIONS} from "../entities/available-user-operations";
import type {AVAILABLE_USER_OPERATIONS_TYPE} from '../entities/available-user-operations-type'
import or from "../utils/or";
import {UserForOperation} from "../utils/user-for-operation";

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

  getAvailableOperations(user: User, currentUser: User | null): readonly Operation[] {
    // Вам нужно поменять логику внутри getAvailableOperations для того, что бы это работало с логином
    if (!currentUser) {
      return []
    }

    if (Admin.is(currentUser) && Admin.is(user)) {
      return this.getOperationsForAdminOverAdmin(currentUser, user)
    }

    if (Admin.is(currentUser) && Moderator.is(user)) {
      return this.getOperationsForAdminOverModerator(currentUser, user)
    }

    if (Admin.is(currentUser) && Client.is(user)) {
      return this.getOperationsForAdminOverClient(currentUser, user)
    }

    if (Moderator.is(currentUser) && Admin.is(user)) {
      return this.getOperationsForModeratorOverAdmin(currentUser, user)
    }

    if (Moderator.is(currentUser) && Moderator.is(user)) {
      return this.getOperationsForModeratorOverModerator(currentUser, user)
    }

    if (Moderator.is(currentUser) && Client.is(user)) {
      return this.getOperationsForModeratorOverClient(currentUser, user)
    }

    return []
  }

  private getOperationsForAdminOverAdmin<CU extends Admin, U extends Admin> (currentUser: CU, user: U): AVAILABLE_USER_OPERATIONS_TYPE[CU['role']][U['role']] {
    return AVAILABLE_USER_OPERATIONS[currentUser.role][user.role]
  }

  private getOperationsForAdminOverModerator<CU extends Admin, U extends Moderator> (currentUser: CU, user: U): AVAILABLE_USER_OPERATIONS_TYPE[CU['role']][U['role']] {
    return AVAILABLE_USER_OPERATIONS[currentUser.role][user.role]
  }

  private getOperationsForAdminOverClient<CU extends Admin, U extends Client> (currentUser: CU, user: U): AVAILABLE_USER_OPERATIONS_TYPE[CU['role']][U['role']] {
    return AVAILABLE_USER_OPERATIONS[currentUser.role][user.role]
  }

  private getOperationsForModeratorOverAdmin<CU extends Moderator, U extends Admin> (currentUser: CU, user: U): AVAILABLE_USER_OPERATIONS_TYPE[CU['role']][U['role']] {
    return AVAILABLE_USER_OPERATIONS[currentUser.role][user.role]
  }

  private getOperationsForModeratorOverModerator<CU extends Moderator, U extends Moderator> (currentUser: CU, user: U): AVAILABLE_USER_OPERATIONS_TYPE[CU['role']][U['role']] {
    return AVAILABLE_USER_OPERATIONS[currentUser.role][user.role]
  }

  private getOperationsForModeratorOverClient<CU extends Moderator, U extends Client> (currentUser: CU, user: U): AVAILABLE_USER_OPERATIONS_TYPE[CU['role']][U['role']] {
    return AVAILABLE_USER_OPERATIONS[currentUser.role][user.role]
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
