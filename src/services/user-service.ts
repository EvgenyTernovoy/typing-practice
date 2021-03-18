import {Role} from "../entities/role";
import {User} from "../entities/user";
import {castTo, RoleToUser} from "../entities/role-to-user";
import {PrivilegedUser} from "../entities/privileged-user";
import {AVAILABLE_USER_OPERATIONS, AVAILABLE_USER_OPERATIONS_TYPE} from "../entities/available-user-operations";
import {ValidEmail} from "../entities/valid-email";
import {ValidPassword} from "../entities/valid-password";

export default class UserService {
  private users: readonly User[] = [];

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) =>
      User.check(u)
    );
    return this.users;
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async getCurrentUser(email: ValidEmail, password: ValidPassword): Promise<User> {
    const registeredUsers = await this.fetch()

    const user = registeredUsers.default.find((u: User) => u.email === email && u.password === password)

    if (!user) {
      throw new Error("User is not found");
    }

    return User.check(user)
  }

  async updateUserRole<R extends Role>(
    user: RoleToUser[R],
    newRole: R
  ) {
    const newUser = castTo(newRole, user);
    this.users = this.users.map((u) => (u.id === user.id ? newUser : u));
    return this.users;
  }

  getAvailableOperations<U1 extends User,
    U2 extends PrivilegedUser,
    >(user: U1, currentUser: U2) {
    return AVAILABLE_USER_OPERATIONS[currentUser.role][user.role] as AVAILABLE_USER_OPERATIONS_TYPE[U2["role"]][U1["role"]];
  }
}
