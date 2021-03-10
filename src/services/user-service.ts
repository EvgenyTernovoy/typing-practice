import {Role} from "../entities/role";
import {Admin} from "../entities/admin";
import {Client} from "../entities/client";
import {Moderator} from "../entities/moderator";
import type {User} from "../entities/user";
import type {RoleToUser} from "../entities/role-to-user";
import {PrivilegedUser} from "../entities/privileged-user";
import {AVAILABLE_USER_OPERATIONS, AVAILABLE_USER_OPERATIONS_TYPE} from "../entities/available-user-operations";

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

  getAvailableOperations<
    R1 extends Role,
    U1 extends User & { role: R1 },
    R2 extends Role,
    U2 extends PrivilegedUser & { role: R2 },
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
